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
  router.get("/login/:user", (req, res) => {
  req.session.userId = req.params.user;
  res.redirect("/");
})
  //NOT COMPLETED: need values
  router.get('/location', (req, response) => {
    console.log('/location:>>')
  });

  router.get('/maps', (req, response) => {
    console.log('/maps:>>')
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

  router.get('/create', (req, res) => {
    console.log('\n\nhi\n\n');
    // console.log(res.body);
    const user = true;
    res.render('createMapForm.ejs', { user })
  })

  //Change '/create' as required
  router.post('/create', (req, res) => {
    //should use cookie for this
    const user_id = 1;
    const mapTitle = req.body.mapTitle;
    addMap(db, user_id, mapTitle)
      .then(data => {
        if (data.rows.length) {
          const user = true;
          const maps = data.rows;
          let map_id = data.rows[0]['id'];
          console.log('map_id is:>>', data.rows)
          return res.render("index", { maps, user });
        }
      })
  });

  //Add pin
  //Change '/create' as required
  router.post('/maps/:mapId/pins', (req, res) => {
    console.log('\n\n/create POST pins:>>\n\n');
    const { title, description, image, latitude, longitude } = req.body;

    addPin(db, title, description, image, latitude, longitude, user_id, map_id)
      .then(data => {
        if (data.rows.length) {
          return res.redirect(`/maps/${map_id}/pins`);
        }
      })
  });

  // is this route necessary
  router.get('/maps/myMaps', (req, response) => {

    const user = req.session.userId;
    getUserMaps(db, user)
    .then(data => {
      const maps = data.rows
      return response.render("favMaps", { maps, user });
    })

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


  });
  router.post('/logout', (req, response) => {
    req.session = null;
    response.redirect('/');
  });
  return router;
};
