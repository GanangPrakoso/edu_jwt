"use strict";

const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        email: "ganang@mail.com",
        password: hashPassword("ganang"),
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "radhea@mail.com",
        password: hashPassword("radhea"),
        role: "staff",
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
        name: "Jujutsu Kaisen",
        description: "Perang penyihir",
        image_url:
          "https://upload.wikimedia.org/wikipedia/id/thumb/4/46/Jujutsu_kaisen.jpg/220px-Jujutsu_kaisen.jpg",
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
