const { Movie } = require("../models");

function adminOnly(req, res, next) {
  try {
    //   validasi kalo bukan admin tidak boleh menuju controller
    if (req.user.role !== "admin") throw { name: "unauthorized" };

    next();
  } catch (error) {
    next(err);
  }
}

async function authStafforAdmin(req, res, next) {
  try {
    if (req.user.role === "admin") {
      return next();
    } else {
      const { id } = req.params;
      const findMovie = await Movie.findByPk(id);

      if (!findMovie) {
        throw { name: "movie not found" };
      }

      if (req.user.id == findMovie.author_id) {
        return next();
      } else {
        throw { name: "unauthorized" };
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { adminOnly, authStafforAdmin };
