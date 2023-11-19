const path = require("path");

const port = process.env.PORT || 8000;
const express = require("express");
// const bodyParser = require("body-parser");
const morgan = require("morgan");
// const mongoose = require("mongoose");
const env = require("dotenv");
const categoryRoute = require("./routes/category");
const brandRoute = require("./routes/brand");
const productRoute = require("./routes/product");
const subCategoryRoute = require("./routes/subCategory");
const DBConnection = require("./config/database");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorHandlingMiddleware");

env.config({ path: "config.env" });

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
  console.log(`Current environment is : ${process.env.NODE_ENV}`);
}
// Middlewares
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Database Connection
DBConnection();

// Routes
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/sub-categories", subCategoryRoute);
app.use("/api/v1/products", productRoute);

// Middleware for Handling Undefined Routes
app.all("*", (req, res, next) => {
  next(new ApiError(`Can't Find This Route: ${req.originalUrl}`, 400));
});

// Global Error Handler Middleware
app.use(globalError);

app.get("/", (req, res) => {
  res.render("home");
});

const server = app.listen(port, () => console.log(`app listening on ${port}`));

// Handle Rejections Errors outside Express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting Down.....`);
    process.exit(1);
  });
});
