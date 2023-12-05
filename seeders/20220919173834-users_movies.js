"use strict";

const { hashPassword } = require("../helpers/bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        email: "user1@mail.com",
        password: hashPassword("user1"),
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "user2@mail.com",
        password: hashPassword("user2"),
        role: "staff",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Movies", [
      {
        name: "Hunter x Hunter",
        description: "child abuse",
        image_url:
          "https://m.media-amazon.com/images/M/MV5BNGM0YTk3MWEtN2JlZC00ZmZmLWIwMDktZTMxZGE5Zjc2MGExXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
        author_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Chainsaw Man",
        description: "sicko wielding chainsaw",
        image_url:
          "https://i.pinimg.com/736x/9f/4e/8c/9f4e8c9e698f21ed53192f4ca9792790.jpg",
        author_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Berserk",
        description: "the unluckiest person in the world",
        image_url:
          "https://pbs.twimg.com/media/F4oNG-IXoAAYssX?format=jpg&name=large",
        author_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Neon Genesis Evangelion",
        description: "sadboy riding robot",
        image_url:
          "https://m.media-amazon.com/images/M/MV5BMGRlZTIwZjQtZWU2NC00MDYzLTg0YWUtOGY3YjU4NTUzOTU1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        author_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
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
