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

  const spotList = [];
  spots.forEach((spot) => spotList.push(spot.toJSON()));
  return res.json(spotList);
});

module.exports = router;
