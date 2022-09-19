const router = require("express").Router();
const userRouter = require("./users");

router.get("/", (req, res) => {
  res.send("halooooo");
});

router.use("/users", userRouter);

module.exports = router;
