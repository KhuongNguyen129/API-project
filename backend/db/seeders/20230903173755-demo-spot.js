"use strict";
const { Spot } = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(
      [
        {
          address: "700 Hwy. 2",
          city: "Leavenworth",
          state: "WA",
          country: "USA",
          lat: 45.4562243543,
          lng: -53.34521435343,
          name: "Leavenworth City",
          description: "German town",
          price: 299.99,
        },
        {
          address: "400 Broad St",
          city: "Seattle",
          state: "WA",
          country: "USA",
          lat: 21.4562243543,
          lng: -35.34521435343,
          name: "Space Needle",
          description:
            "The Space Needle features an observation deck 520 ft (160 m) above ground, providing views of the downtown Seattle skyline, the Olympic and Cascade Mountains",
          price: 39.99,
        },
        {
          address: "1531 Western Ave",
          city: "Seattle",
          state: "WA",
          country: "USA",
          lat: 48.4562243543,
          lng: -59.34521435343,
          name: "Pike Place Market",
          description:
            "Pike Place Market is a public market in Seattle, Washington, United States",
          price: 29.99,
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
    return queryInterface.dropTable("Spots");
  },
};
