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
          spotId: 5,
          url: "https://i.pinimg.com/originals/32/39/9a/32399aec87cffb60c2bfbddec95ce886.jpg",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53219659/original/5994c0c6-58e1-4745-bdb9-10dabb911c41.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53219659/original/7667daac-89bb-49e4-ad61-b0ad1b02a7f6.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53219659/original/b28749d9-ec1b-49c6-810b-cbd7cf053c97.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-53219659/original/3c2046b1-dd78-4ad7-af27-10b2ab15e626.jpeg?im_w=1440",
          preview: false,
        },

        {
          spotId: 6,
          url: "https://i.huffpost.com/gen/779445/images/o-HOMES-FOR-SALE-BY-PRICE-facebook.jpg",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-52133263/original/28ee4d7f-7284-4767-b11e-1f20e257f353.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-52133263/original/14947218-20d6-49d6-8760-04f37e252639.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-52133263/original/a0d01a91-5e03-4165-af5c-200d50160818.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-52133263/original/3626305a-130e-494c-a1a3-eef009e4a958.jpeg?im_w=1440",
          preview: false,
        },

        {
          spotId: 7,
          url: "https://static01.nyt.com/images/2020/06/29/realestate/29WYG-CA-slide-1PG4/29WYG-CA-slide-1PG4-videoSixteenByNine3000.jpg",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/92534e36-d67a-4346-b3cf-7371b1985aca.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-38819319/original/8945be19-e97d-4f42-8284-1f4815d1f646.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-38819319/original/dd6ee6a7-9fd3-4353-9395-a67c2f970e6c.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-38819319/original/d839a1c8-acaa-47f8-8923-f01497000dda.jpeg?im_w=1440",
          preview: false,
        },

        {
          spotId: 8,
          url: "https://lodolofts.com/wp-content/uploads/2018/03/Single-family-homes-for-sale.jpg",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-26870060/original/e3bcb9d0-57b5-49c8-bfde-fea98272db30.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/7dfe9bb8-c5f5-419a-8020-1d9806cd128b.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-552889544808307445/original/0a622fd1-8180-47f1-a9c4-df50e1ca5789.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-552889544808307445/original/81d1590b-731d-40c3-a118-1d255a9c3c78.jpeg?im_w=1440",
          preview: false,
        },

        {
          spotId: 9,
          url: "https://www.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2015/11/06/RealEstate/Images/VA_36a.jpg?t=20170517",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-769394595134822803/original/dc17bc7c-4287-4327-88aa-e0d1e81d3778.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-769394595134822803/original/9a68aaa9-e69f-4023-bcac-be6c239ed6e8.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-769394595134822803/original/57720c83-7f5c-4dc5-af38-32c6f00ee5bc.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-769394595134822803/original/9bb5bd72-57a1-40c1-b94d-618d8adc756d.jpeg?im_w=1440",
          preview: false,
        },

        {
          spotId: 10,
          url: "https://static01.nyt.com/images/2020/07/20/realestate/20WYG-slide-L54C/20WYG-slide-L54C-videoSixteenByNine3000.jpg",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-914630601989159945/original/6dcce3ee-5c7f-44d8-a6c1-fbd0594b208a.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-914630601989159945/original/b320c4f4-daa7-45a1-8a85-23d764320c1e.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-914630601989159945/original/1250cbbb-b765-4ccc-8754-58478f2efbab.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-914630601989159945/original/123ed8e5-c3d9-418c-9c23-22d25b3a0003.jpeg?im_w=1440",
          preview: false,
        },

        {
          spotId: 11,
          url: "https://media.rightmove.co.uk/264k/263750/139191437/263750_32557354_IMG_00_0000.png",
          preview: true,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-582210460159970413/original/587eaae6-80f3-430b-a2de-220b900b45b7.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-582210460159970413/original/b60c2962-63b7-48a0-9f99-c914f95cec59.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-582210460159970413/original/f78066d1-161c-4d80-af09-e14b30763474.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-582210460159970413/original/e5b822bf-709e-401d-8265-cf601ae00c3a.jpeg?im_w=1440",
          preview: false,
        },

        {
          spotId: 12,
          url: "https://cdn.carrot.com/uploads/sites/34737/2019/07/Depositphotos_51925283_l-2015.jpg",
          preview: true,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-39257594/original/021cd9d6-b30a-4984-8c8a-5d984caf8764.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/762d2c36-3743-4f37-a328-69a40be97429.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/f1d0bd9a-f1ff-470e-9120-f00b4b70f33b.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/949dede7-788e-4749-bd35-31ade5f41fa5.jpg?im_w=1440",
          preview: false,
        },

        {
          spotId: 13,
          url: "https://s.hdnux.com/photos/01/11/03/23/19150075/3/1200x0.jpg",
          preview: true,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-48254381/original/2213fc6d-a3b2-42cf-b2b1-f475088fc170.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-48254381/original/75cf6fac-66ab-43c3-a75c-222795e5519e.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-48254381/original/d62e9f5f-ac9a-4b38-afa1-d008f8c3cebc.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 13,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-48254381/original/9035cf03-f8e3-40c6-a4b1-b3a1a2465a9c.jpeg?im_w=1440",
          preview: false,
        },

        {
          spotId: 14,
          url: "https://prgpowerrealtygroup.com/wp-content/uploads/sites/118/2016/03/095-183059-DSC_6400_3670860.jpg",
          preview: true,
        },
        {
          spotId: 14,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-999487170239477846/original/b5b6a20c-5d7e-4fe1-aaed-6817bdf1da7a.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 14,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-999487170239477846/original/7e145108-f4d0-4219-ae02-3432b0ac6d9d.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 14,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-999487170239477846/original/bd35b790-d744-4a5d-b73c-abeeff94ab06.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 14,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-999487170239477846/original/eb3a902d-ef66-4213-9574-c96d3d1d081e.jpeg?im_w=1440",
          preview: false,
        },

        {
          spotId: 15,
          url: "https://i.pinimg.com/originals/8d/c0/0b/8dc00b8c451477fc70a245023ec9e29b.jpg",
          preview: true,
        },
        {
          spotId: 15,
          url: "https://a0.muscache.com/im/pictures/2b4a87d8-11a2-478f-bfdc-dc4cbb95bf0f.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 15,
          url: "https://a0.muscache.com/im/pictures/bf44072b-3a54-4af5-9421-ceaccbc2f0ec.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 15,
          url: "https://a0.muscache.com/im/pictures/cbee588c-ca87-4004-9e17-53682e06695b.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 15,
          url: "https://a0.muscache.com/im/pictures/a6135c22-5eeb-4d11-8776-e25199c1e9d8.jpg?im_w=1440",
          preview: false,
        },

        {
          spotId: 16,
          url: "https://luxport.s3.amazonaws.com/6127/5AF64231-225F-4166-BEBB-CD6D6B330336%2BCD6D6B330336_001_H.jpg",
          preview: true,
        },
        {
          spotId: 16,
          url: "https://a0.muscache.com/im/pictures/93af5c4d-9816-403f-ae6c-3722ee71c63d.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 16,
          url: "https://a0.muscache.com/im/pictures/697210cb-2256-464a-9500-e0785c759e71.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 16,
          url: "https://a0.muscache.com/im/pictures/a45e7aab-9aeb-4e94-bed6-81fff24b4784.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 16,
          url: "https://a0.muscache.com/im/pictures/4c7ed54a-75bc-4e50-8d5d-6fe0312e08fa.jpg?im_w=1440",
          preview: false,
        },

        {
          spotId: 17,
          url: "https://luxport.s3.amazonaws.com/6127/2CE0F58B-6263-4F63-92C0-88058F7D99D8%2B88058F7D99D8_001_H.jpg",
          preview: true,
        },
        {
          spotId: 17,
          url: "https://a0.muscache.com/im/pictures/566efd2d-0550-4454-b814-7b4b8e1c26eb.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 17,
          url: "https://a0.muscache.com/im/pictures/9e197dd6-4412-4c4b-b803-3772619e9fba.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 17,
          url: "https://a0.muscache.com/im/pictures/5e2b1bd9-107b-4c76-9d39-0305b79df06e.jpg?im_w=1440",
          preview: false,
        },
        {
          spotId: 17,
          url: "https://a0.muscache.com/im/pictures/98b2c430-ab79-40f7-bfea-a1ccd48af3ec.jpg?im_w=1440",
          preview: false,
        },

        {
          spotId: 18,
          url: "https://media.architecturaldigest.com/photos/598c86955f33bd7d13f70a3c/master/pass/LA%20DUNE.jpg",
          preview: true,
        },
        {
          spotId: 18,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-1000627167235956148/original/81b4419b-2539-465c-be22-7f72a7d37edd.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 18,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-1000627167235956148/original/9ea88bac-642c-48eb-add3-637b71274f92.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 18,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-1000627167235956148/original/3fd31f1d-f32c-43a7-9fcb-fd2eab3a1e9f.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 18,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-1000627167235956148/original/0d2ef90b-3d52-4774-88bf-befd6aca3ae4.jpeg?im_w=1440",
          preview: false,
        },

        {
          spotId: 19,
          url: "https://2.bp.blogspot.com/-SjeSNjNqQ60/WGx2MEbVFYI/AAAAAAAAGP0/4w5ANgtl4-QUv_3MLfannGZSPEKJgKksgCLcB/s1600/Homes%2BFor%2BSale%2BLas%2BVegas.jpg79.png",
          preview: true,
        },
        {
          spotId: 19,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-645734927755358154/original/a3a6c51f-74f5-4076-af72-a81b27c57d33.jpeg?im_w=1200",
          preview: false,
        },
        {
          spotId: 19,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-645734927755358154/original/83b05fb1-bb01-4a0e-98c9-8a4b5e9144bb.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 19,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-645734927755358154/original/b4725d7c-a39d-442c-a4ef-5b77c080de4d.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 19,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-645734927755358154/original/f04761d4-4317-4aba-8ba2-e40e55d84446.jpeg?im_w=1440",
          preview: false,
        },

        {
          spotId: 20,
          url: "https://img.jamesedition.com/listing_images/2020/12/22/15/11/50/36f58b50-b0cd-488c-bd4a-884287de19ab/je/2000xxsxm.jpg",
          preview: true,
        },
        {
          spotId: 20,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-849168940403272858/original/8075e94f-a289-4e5c-917f-d1223c68e9bd.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 20,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-849168940403272858/original/d25be3e9-7eae-45ff-b014-16ca1a8ab30a.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 20,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-849168940403272858/original/2beb5f2a-127e-4162-98c7-05da3aed49ea.jpeg?im_w=1440",
          preview: false,
        },
        {
          spotId: 20,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-849168940403272858/original/36553b58-58ba-433c-b4e4-ccfccae646f4.png?im_w=1440",
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
