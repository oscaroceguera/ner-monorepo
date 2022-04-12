const mongoose = require("mongoose");
const logger = require("../utils/logger");
const config = require("../utils/config");

const url = config.MONGODB_URI;

logger.info("Connecting to ", url);

mongoose
  .connect(url)
  .then(() => logger.info("connected to MongoDB"))
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

module.exports = { mongoose };
