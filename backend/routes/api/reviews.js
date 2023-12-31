const express = require("express");
const router = express.Router();
const {
  User,
  Spot,
  Review,
  SpotImage,
  ReviewImage,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { convertDateFormat } = require("./date-convert");

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

// Get all Reviews of the Current User

router.get("/current", requireAuth, async (req, res) => {
  const reviews = await Review.findAll({
    where: { userId: req.user.id },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Spot,
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
        ],
        include: [
          {
            model: SpotImage,
            attributes: ["id", "url", "preview"],
          },
        ],
      },
      {
        model: ReviewImage,
        attributes: ["id", "url"],
      },
    ],
  });

  const reviewLists = [];
  reviews.forEach((review) => reviewLists.push(review.toJSON()));

  reviewLists.forEach((review) => {
    const spot = review.Spot;
    spot.SpotImages.forEach((image) => {
      if (image.preview) spot.previewImage = image.url;
    });

    if (!spot.previewImage) spot.previewImage = "No URL found.";
    delete spot.SpotImages;
  });

  res.status(200);
  return res.json({
    Reviews: reviewLists.map((review) => ({
      ...review,
      createdAt: convertDateFormat(review.createdAt),
      updatedAt: convertDateFormat(review.updatedAt),
    })),
  });
});

// Add an Image to a Review based on the Review's id
router.post("/:reviewId/images", requireAuth, async (req, res) => {
  const review = await Review.findByPk(req.params.reviewId, {
    include: ReviewImage,
  });
  if (!review) {
    res.status(404);
    return res.json({ message: "Review couldn't be found" });
  }
  if (review.userId !== req.user.id) {
    res.status(403);
    return res.json({ message: "Forbidden" });
  }

  if (review.ReviewImages.length >= 10) {
    res.status(403);
    return res.json({
      message: "Maximum number of images for this resource was reached",
    });
  }

  const { url } = req.body;

  const newImage = await review.createReviewImage({
    url,
  });

  res.status(200);
  return res.json({
    id: newImage.id,
    url: newImage.url,
  });
});

// Edit a Review
router.put(
  "/:reviewId",
  requireAuth,
  validateCreateReview,
  async (req, res) => {
    const oneReview = await Review.findByPk(req.params.reviewId);
    if (!oneReview) {
      res.status(404);
      return res.json({ message: "Review couldn't be found" });
    }
    if (oneReview.userId !== req.user.id) {
      res.status(403);
      return res.json({ message: "Forbidden" });
    }
    const { review, stars } = req.body;

    await oneReview.update({
      review,
      stars,
    });
    res.status(200);
    return res.json({
      ...oneReview.toJSON(),
      createdAt: convertDateFormat(oneReview.createdAt),
      updatedAt: convertDateFormat(oneReview.updatedAt),
    });
  }
);

// Delete a Review
router.delete("/:reviewId", async (req, res) => {
  const review = await Review.findByPk(req.params.reviewId);
  if (!review) {
    res.status(404);
    return res.json({ message: "Review couldn't be found" });
  }
  if (review.userId !== req.user.id) {
    res.status(403);
    return res.json({ message: "Forbidden" });
  }
  await review.destroy();
  res.status(200);
  return res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
