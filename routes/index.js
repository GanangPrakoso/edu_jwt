const router = require("express").Router();
const userRouter = require("./users");
const movieRouter = require("./movies");
const authentication = require("../middlewares/authentication");

router.use("/users", userRouter);

// authentication
// router.use(authentication);

router.use("/movies", movieRouter);

module.exports = router;
