// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

// const usersRoutes = require("./routes/users");
const usersRoute = require("./routes/usersRoute");

// const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own

// app.use("/api/users", usersRoutes(db));

app.use("/", usersRoute(db));

// app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {

  //  PUT MAPS LOGIC HERE
  // make sure you return an array of maps and send out thier namaes
  // FOR THE MAKERS
  // you will need to make another route (/maps/:id/markers)
  // that you will have to use AJAX on the front end to populate the markers on each map
  console.log('\n\nworking: server.js app.get(/):>>\n\n')
  const maps = ['My Map 1', 'My Map 2', 'My Map 3'];
  res.render("index", { maps });
  // let templateVars = { user: req.session.user };
  // console.log('\n\nworking? server.js file:>>', templateVars);
  // res.render("index", templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
