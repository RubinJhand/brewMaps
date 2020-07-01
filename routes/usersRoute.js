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


module.exports = (db) => {

  //NOT COMPLETED: need values 
  router.get('/location', (req, response) => {
    console.log('/location:>>')
  });

  router.get('/maps', (req, response) => {

    //Returns maps with the most likes
    getMostLikedMaps(db)
      .then(res => {
        if (res.rows.length) {
          let user = true;
          let maps = res.rows;
          return response.render("index", { maps, user });
        }
      })
      .catch(err => console.error(err.stack));
  });

  //WORKING but may need to adjust NOT COMPLETE 
  router.get('/maps/:userId/:location', (req, response) => {

    //require location parameters to complete
    const userId = 1;
    getUserMaps(db, userId)
      .then(res => {
        if (res.rows.length) {
          const user = true;
          const maps = res.rows;
          return response.render("index", { maps, user });
        }
      })
      .catch(err => console.error(err.stack));
  });

  //NOT COMPLETE values
  router.post('/maps/:userId/:location', (req, response) => {
    console.log('/maps/:userId/:location POST')
    //require edit, delete
  });

  //WORKING may need adjustment. Change '/create' as required
  router.post('/create', (req, response) => {

    const userId = 1; //or maybe req.body.userId
    const description = 'fun with route testing';//req.body.description;
    const numLikes = 0;//req.body.numLikes; need to addLikes function
    //add map
    addMap(db, userId, description, numLikes)
      .then(res => {
        if (res.rows.length) {
          const user = true;
          const maps = res.rows;
          return response.render("index", { maps, user });
        }
      })
  });

  //Add pin
  //Change '/create' as required
  router.post('/maps/:mapId/pins', (req, response) => {
    console.log('\n\n/create POST pins:>>\n\n');
    const { title, description, image, latitude, longitude } = req.body;

    addPin(db, title, description, image, latitude, longitude, user_id, map_id)
      .then(res => {
        if (res.rows.length) {
          return response.redirect(`/maps/${map_id}/pins`);
        }
      })
  });

  // is this route necessary
  router.get('/maps/:userId', (req, response) => {


    console.log('\n\nrouter.get/maps/:userId/location:>>', res.rows);

    return response.render("index");

  });

  //WORKING test again
  router.post('/login/:id', (req, response) => {

    const userId = 1;

    getUserMaps(db, userId)
      .then(res => {
        if (res.rows.length) {
          let user = true;
          let maps = result.rows;
          response.render("index", { maps, user });
        }
      });

    router.post('/logout', (req, response) => {
      req.session = null;
      response.redirect('/');
    });

    return router;
  });
};
