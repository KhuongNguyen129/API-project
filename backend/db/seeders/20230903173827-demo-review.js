"use strict";
const { Review } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate(
      [
        { spotId: 3, userId: 1, review: "Beautiful", stars: 5 },
        {
          spotId: 2,
          userId: 3,
          review: "Cold",
          stars: 4,
        },
        {
          spotId: 1,
          userId: 2,
          review: "Cheap food",
          stars: 5,
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
    return queryInterface.dropTable("Reviews");
  },
};
