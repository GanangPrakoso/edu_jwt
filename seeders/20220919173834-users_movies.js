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
      {
        name: "Chainsaw Man",
        description: "Denji the chainsaw man",
        image_url:
          "https://as01.epimg.net/meristation/imagenes/2022/08/05/noticias/1659699263_545679_1659699456_sumario_normal.jpg",
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
