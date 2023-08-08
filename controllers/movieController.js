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

  static async create(req, res, next) {
    try {
      const { name, description, image_url } = req.body;
      await Movie.create({
        name,
        description,
        image_url,
        author_id: req.user.id, // ntar di challenge di ganti
      });

      res.status(201).json({ message: `movie ${name} has been created!` });
    } catch (err) {
      next(err);
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
      next(error);
    }
  }
}

module.exports = MovieController;
