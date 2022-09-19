const router = require("express").Router();
const userRouter = require("./users");
const movieRouter = require("./movies");

router.get("/", (req, res) => {
  res.send("halooooo");
});

router.use("/users", userRouter);

router.use("/movies", movieRouter);

module.exports = router;
