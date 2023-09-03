"use strict";
const { ReviewImage } = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        url: "seattle.com",
      },
      {
        url: "SpaceNeedle.com",
      },
      {
        url: "market.com",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.dropTable("ReviewImages");
  },
};
