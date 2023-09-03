"use strict";
const { Booking } = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate(
      [
        {
          startDate: "12/12/2023",
          endDate: "1/31/2024",
        },
        {
          startDate: "2/11/2024",
          endDate: "4/31/2024",
        },
        {
          startDate: "8/8/2024",
          endDate: "10/31/2024",
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.dropTable("Bookings");
  },
};
