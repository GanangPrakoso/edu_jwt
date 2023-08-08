const router = require("express").Router();
const MovieController = require("../controllers/movieController");
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post("/register", UserController.register);
router.post("/login", UserController.login);

// middleware
router.use(authentication);

router.get("/movies", MovieController.findAll);
router.post("/movies", MovieController.create);

router.delete("/movies/:id", authorization, MovieController.delete);

module.exports = router;
