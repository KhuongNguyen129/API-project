const express = require("express");
const router = express.Router();
const { Spot, Review, SpotImage } = require("../../db/models");

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

  spotLists.forEach((review) => {
    review.avgRating = 0;
    review.Reviews.forEach((stars) => {
      review.avgRating += stars.stars;
    });
    review.avgRating /= review.Reviews.length;

    if (!review.avgRating) review.avgRating = "No average rating found.";
    delete review.Reviews;
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

// router.get("/current", async (req, res) => {

//   const user = await Spot.findOne(req.query.current);

//   res.json(user);
// });

module.exports = router;
