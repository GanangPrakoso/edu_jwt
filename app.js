if (process.env.NODE_ENV !== "production") {
  // cuma dipakai ditahap development dan testing
  require("dotenv").config();
}

const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const router = require("./routes");
const app = express();
const PORT = 3000;
const cors = require("cors");

app.use(cors());

// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

// error handler harus paling bawah
app.use(errorHandler);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
