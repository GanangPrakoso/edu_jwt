const { Movie } = require("../models");
const axios = require("axios");
// CLOUDINARY =========
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
// ======================

class MovieController {
  static async findAll(req, res, next) {
    try {
      const movies = await Movie.findAll();

      res.status(200).json(movies);
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { name, description } = req.body;

      await Movie.create({
        name,
        description,
        author_id: req.user.id,
      });

      res.status(201).json({ message: `movie ${name} has been created!` });
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const findMovie = await Movie.findByPk(id);

      if (!findMovie) {
        throw { name: "not found", type: "movie" };
      }

      await Movie.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({ message: `movie with id ${id} has been deleted` });
    } catch (err) {
      next(err);
    }
  }

  static async nowPlaying(req, res, next) {
    try {
      const { data } = await axios({
        url: "https://api.themoviedb.org/3/movie/now_playing",
        method: "get",
        params: {
          api_key: process.env.EBEL_TMDB,
        },
      });

      const movieResponse = data.results.map((el) => {
        return {
          id: el.id,
          name: el.title,
          description: el.overview,
          image_url: "https://image.tmdb.org/t/p/original" + el.poster_path,
        };
      });

      res.json(movieResponse);
    } catch (error) {
      next(err);
    }
  }

  static async uploadImage(req, res, next) {
    try {
      const findMovie = await Movie.findByPk(req.params.id);
      if (!findMovie) throw { name: "not found", type: "movie" };

      if (!req.file) throw { name: "please provide a picture" };

      const base64Image = req.file.buffer.toString("base64");
      const base64Url = `data:${req.file.mimetype};base64,${base64Image}`;

      const cloudinaryResponse = await cloudinary.uploader.upload(base64Url);

      console.log(cloudinaryResponse, "<<<<");

      await Movie.update(
        { image_url: cloudinaryResponse.secure_url },
        { where: { id: req.params.id } }
      );

      res.json({ message: "image has been uploaded" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovieController;
