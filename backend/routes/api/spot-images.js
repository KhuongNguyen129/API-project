const express = require("express");
const router = express.Router();
const { Spot, SpotImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

// router.get("/", async (req, res) => {
//   const image = await SpotImage.findAll();

//   return res.json(image);
// });
router.delete("/:imageId", requireAuth, async (req, res) => {
  const image = await SpotImage.findByPk(req.params.imageId);
  if (!image) {
    res.status(404);
    return res.json({
      message: "Spot Image couldn't be found",
    });
  }
  const spot = await Spot.findByPk(image.spotId);
  if (!spot) {
    res.status(404);
    return res.json({
      message: "Spot Image couldn't be found",
    });
  }
  if (req.user.id !== spot.ownerId) {
    res.status(403);
    return res.json({
      message: "Forbidden",
    });
  }
  await image.destroy();
  res.status(200);
  return res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
