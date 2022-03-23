const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
