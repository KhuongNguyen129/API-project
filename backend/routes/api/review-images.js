const express = require("express");
const router = express.Router();
const { Review, ReviewImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

// router.get("/", async (req, res) => {
//   const image = await ReviewImage.findAll();

//   return res.json(image);
// });

router.delete("/:imageId", requireAuth, async (req, res) => {
  const reviewImage = await ReviewImage.findByPk(req.params.imageId);

  if (!reviewImage) {
    res.status(404);
    res.json({
      message: "Review Image  couldn't be found",
    });
  }
  const review = await Review.findByPk(reviewImage.reviewId);
  if (req.user.id !== review.userId) {
    res.status(403);
    res.json({
      message: "Forbidden",
    });
  }
  await reviewImage.destroy();
  res.status(200);
  res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
