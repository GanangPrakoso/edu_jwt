const router = require("express").Router();
const MovieController = require("../controllers/movieController");
const UserController = require("../controllers/userController");

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.get("/movies", MovieController.findAll);
router.post("/movies", MovieController.create);
router.delete("/movies/:id", MovieController.delete);

module.exports = router;
