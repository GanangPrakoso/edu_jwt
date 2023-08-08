const { Movie } = require("../models");

async function authorization(req, res, next) {
  try {
    //   1. kita cek data movie di db
    const { id } = req.params;

    const findMovie = await Movie.findByPk(id);
    if (!findMovie) {
      throw { name: "not_found", id: id };
    }

    // 2. proses pengecekan previlege => tambahkan validasi untuk admin = next()
    if (req.user.id !== findMovie.author_id) {
      throw { name: "forbidden" };
    }

    next();
  } catch (error) {
    if (error.name === "not_found") {
      res.status(404).json({ message: `movie with id ${error.id} not found` });
    } else if (error.name === "forbidden") {
      res.status(403).json({ message: `Forbidden` });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = authorization;
