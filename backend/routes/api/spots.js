const express = require("express");
const router = express.Router();
const {
  User,
  Spot,
  Booking,
  Review,
  SpotImage,
  ReviewImage,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

const validateCreateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .exists({ checkFalsy: true })
    .isFloat()
    .withMessage("Latitude is not valid"),
  check("lng")
    .exists({ checkFalsy: true })
    .isFloat()
    .withMessage("Longitude is not valid"),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 49 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .isFloat()
    .withMessage("Price per day is required"),
  handleValidationErrors,
];

const validateQuery = [
  check("page")
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage("Page must be greater than or equal to 1"),
  check("size")
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage("Size must be greater than or equal to 1"),
  check("maxLat")
    .optional()
    .isNumeric()
    .isInt({ min: -500, max: 500 })
    .withMessage("Maximum latitude is invalid"),
  check("minLat")
    .optional()
    .isNumeric()
    .isInt({ min: -500, max: 500 })
    .withMessage("Minimum latitude is invalid"),
  check("maxLng")
    .optional()
    .isNumeric()
    .isInt({ min: -900, max: 900 })
    .withMessage("Maximum longitude is invalid"),
  check("minLat")
    .optional()
    .isNumeric()
    .isInt({ min: -800, max: 800 })
    .withMessage("Minimum longitude is invalid"),
  check("minPrice")
    .optional()
    .isInt({ min: 0 })
    .isNumeric()
    .withMessage("Minimum price must be greater than or equal to 0"),
  check("maxPrice")
    .optional()
    .isInt({ min: 0 })
    .isNumeric()
    .withMessage("Maximum price must be greater than or equal to 0"),
  handleValidationErrors,
];

const findAvg = (spot) => {
  spot.avgRating = 0;
  spot.Reviews.forEach((review) => {
    spot.avgRating += review.stars;
  });
  spot.avgRating /= spot.Reviews.length;

  if (!spot.avgRating) spot.avgRating = "No average rating found.";
  delete spot.Reviews;
};

const findPreviewImageURL = (spotLists) => {
  spotLists.forEach((spotImage) => {
    spotImage.SpotImages.forEach((image) => {
      if (image.preview) spotImage.previewImage = image.url;
    });

    if (!spotImage.previewImage) spotImage.previewImage = "No URL found.";
    delete spotImage.SpotImages;
  });
};

const notFoundError = (spot, res) => {
  if (!spot) {
    res.status(404);
    return res.json({ message: "Spot couldn't be found" });
  }
};

//Get all Spots
router.get("/", validateQuery, async (req, res) => {
  //Add query filters to get all spots
  let { page, size } = req.query;
  page = parseInt(page);
  size = parseInt(size);

  if (!page || isNaN(page) || page > 10) page = 1;
  if (!size || isNaN(size) || size > 20) size = 20;

  let pagination = {
    limit: size,
    offset: size * (page - 1),
  };
  const spots = await Spot.findAll({
    include: [
      {
        model: SpotImage,
      },
      {
        model: Review,
      },
    ],
    ...pagination,
  });

  const spotLists = [];
  spots.forEach((spot) => spotLists.push(spot.toJSON()));

  spotLists.forEach((spot) => {
    findAvg(spot);
  });

  findPreviewImageURL(spotLists);

  const validate = {
    spots: spotLists,
    page,
    size,
  };

  return res.json(validate);
});

//Get all Spots owned by the Current User

router.get("/current", requireAuth, async (req, res) => {
  const spots = await Spot.findAll({
    where: { ownerId: req.user.id },
    include: [
      {
        model: SpotImage,
      },
      {
        model: Review,
      },
    ],
  });

  const spotLists = [];
  spots.forEach((spot) => spotLists.push(spot.toJSON()));

  spotLists.forEach((spot) => {
    findAvg(spot);
  });

  findPreviewImageURL(spotLists);
  return res.json(spotLists);
});

//Get details of a Spot from an id

router.get("/:spotId", requireAuth, async (req, res) => {
  const spots = await Spot.findByPk(req.params.spotId, {
    include: [
      {
        model: Review,
      },
      {
        model: SpotImage,
        attributes: ["id", "url", "preview"],
      },
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  });

  notFoundError(spots, res);

  const owner = { ...spots.toJSON(), Owner: spots.User };
  delete owner.User;

  owner.numReviews = owner.Reviews.length;
  if (!owner.numReviews) owner.numReviews = "No Reviews found.";

  findAvg(owner);

  return res.json(owner);
});

//Create a Spot

router.post("/", requireAuth, validateCreateSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  const spots = await Spot.create({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });

  const owner = { ...spots.toJSON(), ownerId: req.user.id };
  res.status(201);
  return res.json(owner);
});

//Add an Image to a Spot based on the Spot's id

router.post("/:spotId/images", requireAuth, async (req, res) => {
  const userSpot = await Spot.findByPk(req.params.spotId);
  notFoundError(userSpot, res);

  const { url, preview } = req.body;
  if (userSpot) {
    if (req.user.id === userSpot.ownerId) {
      const image = await SpotImage.create({
        spotId: req.params.spotId,
        url,
        preview,
      });

      return res.json({
        id: image.id,
        url: image.url,
        preview: image.preview,
      });
    }
  }
});

//Edit a Spot

router.put("/:spotId", requireAuth, validateCreateSpot, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  notFoundError(spot, res);

  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  await spot.update({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
  });
  res.status(200);
  return res.json(spot);
});

//Delete a Spot

router.delete("/:spotId", requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  notFoundError(spot, res);
  await spot.destroy();
  res.status(200);
  return res.json({
    message: "Successfully deleted",
  });
});

//Get all Reviews by a Spot's id

router.get("/:spotId/reviews", async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  notFoundError(spot, res);

  const reviews = await Review.findAll({
    where: { spotId: spot.id },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  res.status(200);
  return res.json(reviews);
});

const validateCreateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

// Create a Review for a Spot based on the Spot's id
router.post(
  "/:spotId/reviews",
  requireAuth,
  validateCreateReview,
  async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    notFoundError(spot, res);

    const alreadyHaveReview = await Review.findOne({
      where: { spotId: spot.id, userId: req.user.id },
    });
    if (alreadyHaveReview) {
      res.status(500);
      return res.json({ message: "User already has a review for this spot" });
    } else {
      const { review, stars } = req.body;
      const newReview = await Review.create({
        userId: req.user.id,
        spotId: spot.id,
        review,
        stars,
      });
      res.status(201);
      return res.json(newReview);
    }
  }
);

// Get all Bookings for a Spot based on the Spot's id
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  notFoundError(spot, res);

  if (spot.ownerId == req.user.id) {
    const bookings = await Booking.findAll({
      where: { spotId: spot.id },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });
    res.status(200);
    return res.json(bookings);
  } else {
    const bookings = await Booking.findAll({
      where: { spotId: spot.id },
      attributes: ["spotId", "startDate", "endDate"],
    });
    res.status(200);
    return res.json(bookings);
  }
});

// Create a Booking from a Spot based on the Spot's id
router.post("/:spotId/bookings", requireAuth, async (req, res) => {
  const spot = await Spot.findByPk(req.params.spotId);
  notFoundError(spot, res);

  if (spot.ownerId === req.user.id) {
    res.status(403);
    return res.json({
      message: "Forbidden",
    });
  }

  const { startDate, endDate } = req.body;

  const newStartDate = new Date(startDate);
  const newEndDate = new Date(endDate);

  if (!newStartDate || !newEndDate || newStartDate >= newEndDate) {
    res.status(400);
    return res.json({
      message: "Bad Request",
      errors: {
        endDate: "endDate cannot be on or before startDate",
      },
    });
  }

  const alreadyBooking = await Booking.findOne({
    where: {
      spotId: spot.id,
      startDate: {
        [Op.lte]: newEndDate,
      },
      endDate: {
        [Op.gte]: newStartDate,
      },
    },
  });
  if (alreadyBooking) {
    const message = {
      message: "Sorry, this spot is already booked for the specified dates",
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking",
      },
    };
    res.status(403);
    return res.json(message);
  }

  const newBooking = await Booking.create({
    spotId: spot.id,
    userId: req.user.id,
    startDate: newStartDate,
    endDate: newEndDate,
  });

  res.status(200);
  return res.json(newBooking);
});

module.exports = router;
