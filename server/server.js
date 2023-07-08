const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const path = require("path");
const { errorHandler } = require("./middleware/errorMiddleware");
// const PORT = process.env.port || 3000;
const PORT = 3000;


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.resolve(__dirname, "../build")));

app.get("/", (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, "../index.html"));
});

// created a route file to keep code organized
// all routes to /api/inventory go to inventoryRoutes
app.use('/api/inventory', require('./routes/inventoryRoutes'));
app.use("/api/users", require("./routes/userRoutes"));


// create error handler to replace default express error handler
app.use(errorHandler);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
