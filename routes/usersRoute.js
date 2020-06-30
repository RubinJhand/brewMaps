const express = require('express');
const {
  getUserId,
  getMostLikedMaps,
  getUserMaps,
  getAllUserContributions,
  notUserMaps,
  addMap,
  addPin } = require('./api/usersApi');
const router = express.Router();

//db is from server.js, app.use("/", usersRoute(db)); Line 47 
module.exports = (db) => {

  //NOT COMPLETED: need values 
  router.get('/location', (req, response) => {
    console.log('/location:>>')
  });

  router.get('/maps', (req, response) => {
    console.log('/maps:>>')
    //Returns maps with the most likes
    let result = getMostLikedMaps(db)
      .then(res => {
        if (res.rows.length) {
          console.log('\n\ngetMostLikedMaps:>>', res.rows);
          return response.render("index", { templateVar: result });
        }
      })
      .catch(err => console.error(err.stack));
  });

  //NOT COMPLETE 
  router.get('/maps/:userId/:location', (req, response) => {
    console.log('/maps/:userId/:location GET')
    //require location parameters to complete
    getUserMaps(db, req.params.id);
  });

  //NOT COMPLETE values
  router.post('/maps/:userId/:location', (req, response) => {
    console.log('/maps/:userId/:location POST')
    //require edit, delete
  });

  //Change '/create' as required
  router.post('/create', (req, response) => {
    console.log('\n\n/create POST:>>\n\n')
    const userId = req.session.user.id; //or maybe req.body.userId
    const description = req.body.description;
    const numLikes = req.body.numLikes;
    //add map
    addMap(db, userId, description, numLikes)
      .then(res => {
        if (res.rows.length) {
          let map_id = res.rows[0]['id'];
          return response.redirect(`/maps/${map_id}`);
        }
      })
  });

  //Add pin
  //Change '/create' as required
  router.post('/maps/:mapId/pins', (req, response) => {
    console.log('\n\n/create POST pins:>>\n\n');
    const { title, description, image, latitude, longitude } = req.body;
    addPin(db, title, description, image, latitude, longitude)
      .then(res => {
        if (res.rows.length) {
          let map_id = res.rows[0]["id"];
          return response.redirect(`/maps/${map_id}/pins`);
        }
      })
  });

  router.get('/maps/:userId', (req, response) => {
    console.log('/maps/:userId:>>')
    const userId = req.params.user.id; //change to what is required
    const templateVars = {
      userMaps: getAllUserContributions(db, userId)
    }
      .then(res => {
        if (res.rows.length) {
          console.log('\n\ngetAllUserContributions:>>', res.rows);
          return response.render('index', templateVars);
        }
      })
      .catch(err => console.error(err.stack));
  });

  router.post('/login/:id', (req, response) => {

    // getMostLikedMaps(db)
    // getUserMaps(db, 2)
    // getAllUserContributions(db, 1)
    // notUserMaps(db, 1)
    addPin(db, 'tester1', 'tedium', 'butss', 1.2033, -12.34343, 1, 4)
      .then(res => {
        if (res.rows.length) {
          console.log('\n\ngetMostLikedMaps:>>', res.rows);
          // return response.redirect("/");
        }
      })
      .catch(err => console.error(err.stack));
  });

  router.post('/logout', (req, response) => {
    req.session = null;
    response.redirect('/');
  });

  return router;
};
