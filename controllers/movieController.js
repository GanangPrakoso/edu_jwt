const { Movie } = require("../models");

class MovieController {
  static async findAll(req, res) {
    try {
      const movies = await Movie.findAll();

      res.status(200).json(movies);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async create(req, res) {
    try {
      const { name, description, image_url, author_id } = req.body;
      await Movie.create({
        name,
        description,
        image_url,
        author_id,
      });

      res.status(201).json({ message: `movie ${name} has been created!` });
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        res.status(400).json({ message: err.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;

      await Movie.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({ message: `movie with id ${id} has been deleted` });
    } catch (error) {
      console.log(error, "<<<<");
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = MovieController;
