const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./Routes");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const { mongoose } = require("./db/mongoose");

app.use(cors());
app.use(express.static("../app/build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api", routes);

app.use(middleware.unknowEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
