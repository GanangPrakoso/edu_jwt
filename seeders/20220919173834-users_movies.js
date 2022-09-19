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
        name: "Saras 008",
        description: "Pahlawan kebajikan",
        image_url:
          "https://upload.wikimedia.org/wikipedia/id/7/70/Saras_008_%28Poster%29.jpg",
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
