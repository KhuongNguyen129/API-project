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
        { spotId: 3, userId: 5, review: "Beautiful", stars: 5 },
        {
          spotId: 2,
          userId: 4,
          review: "Cold and I like it",
          stars: 4,
        },
        {
          spotId: 1,
          userId: 4,
          review:
            "It is a beautiful house! It had all the space we needed and then some. This is a fantastic place.",
          stars: 5,
        },
        {
          spotId: 1,
          userId: 5,
          review:
            "The weather is excessively chilly and windy, and the floor is quite noisy.  This is a fantastic place.",
          stars: 3,
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
    options.tableName = "Reviews";
    return queryInterface.dropTable(options);
  },
};
