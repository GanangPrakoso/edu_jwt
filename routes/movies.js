const router = require("express").Router();
const authorization = require("../middlewares/authorization");
const { Movie } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.findAll();

    res.status(200).json(movies);
  } catch (err) {
    // res.status(500).json({ message: "Internal Server Error" });
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.id);

    if (!movie) {
      throw { name: "data_not_found" };
    }
    res.status(200).json(movie);
  } catch (err) {
    // res.status(500).json({ message: "Internal Server Error" });
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, description, image_url } = req.body;
    await Movie.create({
      name,
      description,
      image_url,
      author_id: req.user.id,
    });

    res.status(201).json({ message: `movie ${name} has been created!` });
  } catch (err) {
    next(err);
  }
});

// TODO: add delete here!
router.delete("/:movieId", authorization, async (req, res, next) => {
  try {
    const { movieId } = req.params;
    await Movie.destroy({
      where: {
        id: movieId,
      },
    });

    res
      .status(200)
      .json({ message: `movie with id ${movieId} has been deleted` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
