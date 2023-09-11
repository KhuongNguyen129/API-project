const express = require("express");
const router = express.Router();
const { Spot, Booking, SpotImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { Op } = require("sequelize");
const { convertDateFormat, convertOnlyDate } = require("./date-convert");

// Get all of the Current User's Bookings
router.get("/current", requireAuth, async (req, res) => {
  const bookings = await Booking.findAll({
    where: { userId: req.user.id },
    include: [
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
            attributes: ["url", "preview"],
          },
        ],
      },
    ],
  });

  const bookingLists = [];
  bookings.forEach((booking) => bookingLists.push(booking.toJSON()));

  bookingLists.forEach((booking) => {
    const spot = booking.Spot;
    spot.SpotImages.forEach((image) => {
      if (image.preview) spot.previewImage = image.url;
    });

    if (!spot.previewImage) spot.previewImage = "No URL found.";
    delete spot.SpotImages;
  });

  res.status(200);
  return res.json({
    Bookings: bookingLists.map((oneBooking) => ({
      ...oneBooking,
      startDate: convertOnlyDate(oneBooking.startDate),
      endDate: convertOnlyDate(oneBooking.endDate),
      createdAt: convertDateFormat(oneBooking.createdAt),
      updatedAt: convertDateFormat(oneBooking.updatedAt),
    })),
  });
});

//Edit a Booking
router.put("/:bookingId", requireAuth, async (req, res) => {
  const booking = await Booking.findByPk(req.params.bookingId);
  if (!booking) {
    res.status(404);
    return res.json({ message: "Booking couldn't be found" });
  }
  if (booking.userId !== req.user.id) {
    res.status(403);
    return res.json({ message: "Forbidden" });
  }

  const { startDate, endDate } = req.body;

  const newStartDate = new Date(startDate);
  const newEndDate = new Date(endDate);

  if (newStartDate > newEndDate) {
    const message = {
      message: "Bad Request",
      errors: {
        endDate: "endDate cannot come before startDate",
      },
    };
    res.status(400);
    return res.json(message);
  }

  const alreadyBooking = await Booking.findOne({
    where: {
      spotId: booking.spotId,
      id: {
        [Op.ne]: booking.id,
      },
      startDate: {
        [Op.lt]: newEndDate,
      },
      endDate: {
        [Op.gt]: newStartDate,
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

  const date = new Date();
  if (date > booking.endDate) {
    res.status(403);
    return res.json({
      message: "Past bookings can't be modified",
    });
  }

  if (booking.userId === req.user.id) {
    await booking.update({
      startDate,
      endDate,
    });

    res.status(200);
    return res.json({
      ...booking.toJSON(),
      startDate: convertOnlyDate(booking.startDate),
      endDate: convertOnlyDate(booking.endDate),
      createdAt: convertDateFormat(booking.createdAt),
      updatedAt: convertDateFormat(booking.updatedAt),
    });
  }
});

//Delete Booking
router.delete("/:bookingId", requireAuth, async (req, res) => {
  const booking = await Booking.findByPk(req.params.bookingId);
  if (!booking) {
    res.status(404);
    return res.json({ message: "Booking couldn't be found" });
  }
  const spot = await Spot.findByPk(req.user.id);
  if (booking.userId !== req.user.id) {
    if (spot.ownerId !== req.user.id) {
      res.status(403);
      return res.json({ message: "Forbidden" });
    }
    res.status(403);
    return res.json({ message: "Forbidden" });
  }

  const newStartDate = new Date(booking.startDate);
  const date = new Date();
  if (date > newStartDate) {
    res.status(403);
    return res.json({
      message: "Bookings that have been started can't be deleted",
    });
  }
  await booking.destroy();
  res.status(200);
  return res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
