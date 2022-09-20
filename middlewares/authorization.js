const { Movie } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const findMovie = await Movie.findByPk(movieId);
    if (!findMovie) {
      throw { name: "data_not_found" };
    }

    if (findMovie.author_id !== req.user.id) {
      throw { name: "forbidden" };
    }

    next();
  } catch (err) {
    if (err.name === "data_not_found") {
      res.status(404).json({ message: "Movie not found" });
    } else if (err.name === "forbidden") {
      res.status(403).json({ message: "Forbidden" });
    } else {
      res.status(500).json({ message: "ISE" });
    }
  }
};

module.exports = authorization;
