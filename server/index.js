const path = require("path");
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const db = require("./db");
const PORT = process.env.PORT || 8080;
const app = express();
const bodyParser = require("body-parser");

const createApp = () => {

  // logging middleware
  app.use(morgan("dev"));

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // using bodyParser to parse JSON bodies into JS objects
  app.use(bodyParser.json());

  // compression middleware
  app.use(compression());

  // api route
  app.use("/api", require("./api"));

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error("Not found");
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });
};

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  );
};

const syncDb = () => db.sync();

async function bootApp() {
  try {
    await syncDb();
  } catch (error) {
    console.error("Error occured while syncing database: ", error);
  }
  try {
    await createApp();
  } catch (error) {
    console.error("Error occured while creating app: ", error);
  }
  try {
    await startListening();
  } catch (error) {
    console.error("Error occured while starting to listen: ", error);
  }
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp();
} else {
  createApp();
}

module.exports = app;
