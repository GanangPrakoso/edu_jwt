const router = require("express").Router();
const { Movie } = require("../models");

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.findAll();

    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, image_url, author_id } = req.body;
    await Movie.create({
      name,
      description,
      image_url,
      author_id, // masih didapat dari req.body => ganti sesuai req di authentication
    });

    res.status(201).json({ message: `movie ${name} has been created!` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
