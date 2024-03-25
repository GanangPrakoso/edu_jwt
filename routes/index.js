const router = require("express").Router();
const MovieController = require("../controllers/movieController");
const UserController = require("../controllers/userController");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.get("/movies", MovieController.findAll);
router.post("/movies", MovieController.create);
router.delete("/movies/:id", MovieController.delete);
router.patch(
  "/movies/upload-image/:id",
  upload.single("gambar"),
  MovieController.uploadImage
);

module.exports = router;
