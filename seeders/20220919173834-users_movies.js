"use strict";

const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        email: "user1@mail.com",
        password: hashPassword("user1"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Movies", [
      {
        name: "Chainsaw Man",
        description: "Manusia gergaji",
        image_url:
          "https://i.pinimg.com/736x/47/b9/d0/47b9d07062937b219d147b2968a58a23.jpg",
        author_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Better Call Saul",
        description: "It's all good man",
        image_url: "https://flxt.tmsimg.com/assets/p13837077_b_v8_aa.jpg",
        author_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Twenty Five Twenty One",
        description: "Friendship and beyond",
        image_url:
          "https://upload.wikimedia.org/wikipedia/id/thumb/1/15/Twenty-Five_Twenty-One.jpg/250px-Twenty-Five_Twenty-One.jpg",
        author_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Movies", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
