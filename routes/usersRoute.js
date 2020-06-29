const express = require('express');
const {
  getUserId,
  getMostLikedMaps,
  getUserMaps,
  getAllUserContributions,
  notUserMaps } = require('./api/usersApi');
const router = express.Router();

//db is from server.js, app.use("/", usersRoute(db)); Line 47 
module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log('\n\nrouter.get WORKING in usersRoute.js file:>> \n\n');
    res.render("index", { user: req.session.user });
  });

  router.post("/login/:id", (req, response) => {

    //fetches user object by id
    getUserId(db, req.params.id)
      .then(res => {
        //if user exists, log them in, redirect to home page
        if (res.rows.length) {
          console.log('\n\ngetUserId:>>', res.rows[0]);
          return response.redirect("/");
        }
      })
      .catch(err => console.error(err.stack));

    //Returns maps with the most likes
    getMostLikedMaps(db)
      .then(res => {

        if (res.rows.length) {
          console.log('\n\ngetMostLikedMaps:>>', res.rows);
          // return response.redirect("/");
        }
      })
      .catch(err => console.error(err.stack));

    //Returns all the user's maps
    getUserMaps(db, req.params.id)
      .then(res => {

        if (res.rows.length) {
          console.log('\n\ngetUserMaps:>>', res.rows);
          // return response.redirect("/");
        }
      })
      .catch(err => console.error(err.stack));

    //Returns all the user favourites and created
    getAllUserContributions(db, req.params.id)
      .then(res => {

        if (res.rows.length) {
          console.log('\n\ngetAllUserContributions:>>', res.rows);
          // return response.redirect("/");
        }
      })
      .catch(err => console.error(err.stack));

    //Returns maps not created by or favourited by user
    notUserMaps(db, req.params.id)
      .then(res => {

        if (res.rows.length) {
          console.log('\n\nnotUserMaps:>>', res.rows);
          // return response.redirect("/");
        }
      })
      .catch(err => console.error(err.stack));


  });

  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  return router;
};
