const express = require("express");
const router = express.Router();
const { User, Spot, Review, SpotImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
router.get("/", async (req, res) => {
  const spots = await Spot.findAll({
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
    spot.avgRating = 0;
    spot.Reviews.forEach((review) => {
      spot.avgRating += review.stars;
    });
    spot.avgRating /= spot.Reviews.length;

    if (!spot.avgRating) spot.avgRating = "No average rating found.";
    delete spot.Reviews;
  });

  spotLists.forEach((spotImage) => {
    spotImage.SpotImages.forEach((image) => {
      if (image.preview) spotImage.previewImage = image.url;
    });

    if (!spotImage.previewImage) spotImage.previewImage = "No URL found.";
    delete spotImage.SpotImages;
  });

  return res.json(spotLists);
});

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
    spot.avgRating = 0;
    spot.Reviews.forEach((review) => {
      spot.avgRating += review.stars;
    });
    spot.avgRating /= spot.Reviews.length;

    if (!spot.avgRating) spot.avgRating = "No average rating found.";
    delete spot.Reviews;
  });

  spotLists.forEach((spot) => {
    spot.SpotImages.forEach((image) => {
      if (image.preview) spot.previewImage = image.url;
    });

    if (!spot.previewImage) spot.previewImage = "No URL found.";
    delete spot.SpotImages;
  });

  return res.json(spotLists);
});

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

  if (!spots) {
    res.status(404);
    return res.json({ message: "Spot couldn't be found" });
  }
  const owner = { ...spots.toJSON(), Owner: spots.User };
  delete owner.User;

  owner.numReviews = owner.Reviews.length;
  if (!owner.numReviews) owner.numReviews = "No Reviews found.";

  owner.avgRating = 0;
  owner.Reviews.forEach((review) => {
    owner.avgRating += review.stars;
  });
  owner.avgRating /= owner.Reviews.length;

  if (!owner.avgRating) owner.avgRating = "No average rating found.";
  delete owner.Reviews;

  res.json(owner);
});

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
  res.json(owner);
});

router.post("/:spotId/images", requireAuth, async (req, res) => {
  const userSpot = await Spot.findByPk(req.params.spotId);
  if (!userSpot) {
    res.status(404);
    return res.json({ message: "Spot couldn't be found" });
  }

  const { url, preview } = req.body;
  if (userSpot) {
    // check if user making the request to add an image is the same as the ownerId of the current spot
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

module.exports = router;
