require("dotenv").config();

const express = require("express");
const router = require("./routes");
const app = express();
const PORT = 3000;

// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
