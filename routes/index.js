const router = require("express").Router();
const MovieController = require("../controllers/movieController");
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const { adminOnly, authStafforAdmin } = require("../middlewares/authorization");

// MULTER SETUP ======
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
// ===================

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.get("/movies", authentication, MovieController.findAll);
router.post("/movies", authentication, MovieController.create);
router.delete("/movies/:id", authentication, adminOnly, MovieController.delete);

router.get("/movies/now-playing", MovieController.nowPlaying);

router.patch(
  "/movies/:id",
  upload.single("gambar"),
  MovieController.uploadImage
);

module.exports = router;
