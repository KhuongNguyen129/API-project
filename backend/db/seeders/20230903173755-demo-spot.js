"use strict";
const { Spot } = require("../models");
const { faker } = require("@faker-js/faker");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

function generateSpots(count = 20) {
  const spots = [];

  for (let i = 0; i < count; i++) {
    const spot = {
      ownerId: faker.number.int({ min: 1, max: 3 }),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      country: faker.location.country(),
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
      name: faker.person.firstName() + " House",
      description:
        "Great home with roaming " + faker.animal.type() + " around to admire!",
      price: faker.number.float({ min: 100, max: 500, precision: 0.01 }),
    };
    spots.push(spot);
  }
  return spots;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(generateSpots(), { validate: true });
    // [
    //   {
    //     ownerId: 2,
    //     address: "700 Hwy. 2",
    //     city: "Leavenworth",
    //     state: "WA",
    //     country: "USA",
    //     lat: 45.4562243543,
    //     lng: -53.34521435343,
    //     name: "Leavenworth City",
    //     description:
    //       "German town is a place where time seems to slow down, allowing visitors to savor the beauty of both the past and the present. Whether you're seeking tranquility or adventure, Bergheim welcomes you with open arms and a warm",
    //     price: 499.99,
    //   },
    //   {
    //     ownerId: 3,
    //     address: "400 Broad St",
    //     city: "Seattle",
    //     state: "WA",
    //     country: "USA",
    //     lat: 21.4562243543,
    //     lng: -35.34521435343,
    //     name: "Space Needle",
    //     description:
    //       "The Space Needle features an observation deck 520 ft (160 m) above ground, providing views of the downtown Seattle skyline, the Olympic and Cascade Mountains",
    //     price: 599.99,
    //   },
    //   {
    //     ownerId: 1,
    //     address: "1531 Western Ave",
    //     city: "Seattle",
    //     state: "WA",
    //     country: "USA",
    //     lat: 48.4562243543,
    //     lng: -59.34521435343,
    //     name: "Pike Place Market",
    //     description:
    //       "Pike Place Market is a public market in Seattle, Washington, United States",
    //     price: 399.99,
    //   },
    //   {
    //     ownerId: 1,
    //     address: "11292 SW Ave",
    //     city: "Seattle",
    //     state: "WA",
    //     country: "USA",
    //     lat: 58.4562243543,
    //     lng: -69.34521435343,
    //     name: "Rich House",
    //     description: "Good view",
    //     price: 699.99,
    //   },
    // ],
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Spots";
    return queryInterface.dropTable(options);
  },
};
