const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const waitListRouter = require("./controllers/waitlist");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

logger.info("connecting to", config.MONGODB_URL);

mongoose
  .connect(`${config.MONGODB_URL}`)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/waitlist", waitListRouter);

app.use(middleware.tokenExtractor);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
