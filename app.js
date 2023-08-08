require("dotenv").config();

const express = require("express");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandlers");
const app = express();
const PORT = 3000;

// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

// error handler => modular
app.use(errorHandler);

console.log(process.env);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
