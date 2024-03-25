const { Movie } = require("../models");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

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
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async uploadImage(req, res) {
    try {
      const base64Image = req.file.buffer.toString("base64");
      const base64Url = `data:${req.file.mimetype};base64,${base64Image}`;

      const uploaded = await cloudinary.uploader.upload(base64Url);

      await Movie.update(
        { image_url: uploaded.secure_url },
        { where: { id: req.params.id } }
      );

      res.json({ message: "upload image abangkuh" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = MovieController;
