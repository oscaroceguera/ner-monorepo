const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { mongoose } = require("./db/mongoose");

const routes = require("./Routes");

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(express.static("../app/build"));

app.use("/api", routes);

const unknowEndponit = (req, res) => {
  res.status(404).send({ error: "unknow endpoint" });
};

app.use(unknowEndponit);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name == "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
app.use(errorHandler);

module.exports = app;
