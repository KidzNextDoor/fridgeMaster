const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, "../build")));

app.get("/", (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, "../index.html"));
});

mongoose.connect("mongodb+srv://jujubecadet5:eKgNmEUmLHoMh3F5@cluster0.lhvbuj6.mongodb.net/fridgewizard");

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
