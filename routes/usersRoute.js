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

    //Returns maps with the most likes
    let result = getMostLikedMaps(db)
      // console.log('\n\n/maps RESULT:>>', result)
      .then(res => {
        if (res.rows.length) {
          console.log('\n\ngetMostLikedMaps  :>>', res.rows);
          let user = true;
          let maps = res.rows;
          return response.render("index", { maps, user });
        }
      })
      .catch(err => console.error(err.stack));
  });

  //NOT COMPLETE 
  router.get('/maps/:userId/:location', (req, response) => {
    console.log('/maps/:userId/:location GET')
    //require location parameters to complete
    const userId = 1;
    getUserMaps(db, userId)
      .then(res => {
        if (res.rows.length) {
          console.log('\n\nrouter.get/maps/:userId/location:>>', res.rows);
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

  //Change '/create' as required
  router.post('/create', (req, response) => {
    console.log('\n\n/create POST:>>\n\n')
    const userId = 1; //or maybe req.body.userId
    const description = 'fun with route testing';//req.body.description;
    const numLikes = 0;//req.body.numLikes; need to addLikes function
    //add map
    addMap(db, userId, description, numLikes)
      .then(res => {
        if (res.rows.length) {
          const user = true;
          const maps = res.rows;
          let map_id = res.rows[0]['id'];
          console.log('map_id is:>>', res.rows)
          return response.render("index", { maps, user });
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
  // '/maps/:map_id' redirects here, fix
  router.get('/maps/:userId', (req, response) => {


    console.log('\n\nrouter.get/maps/:userId/location:>>', res.rows);

    return response.render("index");

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
