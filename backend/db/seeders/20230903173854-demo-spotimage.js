"use strict";
const { SpotImage } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: "https://images.trvl-media.com/lodging/35000000/34350000/34341200/34341102/7adbb617.jpg?impolicy=resizecrop&rw=1200&ra=fit",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/108827710/e95f76a8_original.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/108827745/b790742b_original.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/108827995/d5f7d296_original.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/108828368/d80fbf32_original.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://images.trvl-media.com/lodging/75000000/74240000/74239400/74239315/7ef736c3.jpg?impolicy=resizecrop&rw=1200&ra=fit",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-623943401509054565/original/06ecff8f-762c-4d7f-8ab2-c967ed210fbc.jpeg?im_w=1440",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-623943401509054565/original/14ab972c-a68d-4888-b43f-3b0ce54ebe22.jpeg?im_w=1440",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-623943401509054565/original/b3caf9dc-09f7-4f7c-bc33-5f47721ffbd5.jpeg?im_w=1440",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-623943401509054565/original/b355c54e-a9f3-430e-9a16-3e02b12680c5.jpeg?im_w=1440",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://img.zumpercdn.com/659963597/1280x960?w=680&fit=max",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/92342d1d-4e08-4c50-98af-a8675902dd9a.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/68febea5-1e2a-43b6-acfe-e4128af35e30.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/9f248a9c-c7a6-4a7e-9ead-1347ef719de6.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/d9334bd8-4eea-4e27-9509-0a441c2543f1.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://api-prod.corelogic.com/trestle/Media/HILTONHEAD/Property/PHOTO-jpeg/1034148918/1/MzU1MS8yMzE1LzIw/MjAvMTMxMjMvMTY5NDE2NzU2MA/Ittw-EaCyTanqiFoQfTCziM5QgrwD7TRivATuCcvlew",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-26870060/original/e3bcb9d0-57b5-49c8-bfde-fea98272db30.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/7dfe9bb8-c5f5-419a-8020-1d9806cd128b.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-552889544808307445/original/0a622fd1-8180-47f1-a9c4-df50e1ca5789.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-552889544808307445/original/81d1590b-731d-40c3-a118-1d255a9c3c78.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-552889544808307445/original/d9049c0c-5d0f-4d53-8583-2ce1088a522c.jpeg?im_w=1440",
          preview: false,
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
    options.tableName = "SpotImages";
    return queryInterface.dropTable(options);
  },
};
