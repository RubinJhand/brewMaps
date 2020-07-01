const express = require('express');
const {
  getUserId,
  getMostLikedMaps,
  getUserMaps,
  getAllUserContributions,
  notUserMaps,
  addMap,
  deleteMap,
  addPin } = require('./api/usersApi');
const { response } = require('express');
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
        if (req.session.userId) {
          let maps = res.rows;
          return response.render("index", { maps });
        }
      })
      .catch(err => console.error(err.stack));
  });

  //WORKING but may need to adjust NOT COMPLETE
  router.get('/maps/:userId/:location', (req, response) => {

    //require location parameters to complete
    const user = req.session.userId;
    getUserMaps(db, userId)
      .then(res => {
        if (req.session.userId) {
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
    const user = req.session.userId;
    res.render('createMapForm.ejs', { user })
  })

  //Change '/create' as required
  router.post('/create', (req, res) => {
    //should use cookie for this
    const user = req.session.userId;
    const mapTitle = req.body.mapTitle;
    addMap(db, user, mapTitle)
      .then(data => {
        if (req.session.userId) {
          const maps = data.rows;
          // let map_id = data.rows[0]['id'];
          return res.render("index", { maps, user });
        }
      })
  });

  //Add pin
  //Change '/create' as required
  router.post('/maps/:mapId/pins', (req, res) => {
    const { title, description, image, latitude, longitude } = req.body;
    addPin(db, title, description, image, latitude, longitude, user_id, map_id)
      .then(data => {
        if (req.session.userId) {
          return res.redirect(`/maps/${map_id}/pins`);
        }
      })
  });

  // All of users saved/my maps
  router.get('/maps/myMaps', (req, response) => {
    const user = req.session.userId;
    getUserMaps(db, user)
    .then(data => {
      const maps = data.rows
      return response.render("favMaps", { maps, user });
    })

  });
  //Delete buttons
  router.post('/myMaps/delete', (req, res) => {
    const user = req.session.userId;
    const mapId = req.body.mapId;
    console.log("user, mapID: ", user, mapId);
    deleteMap(db, user, mapId)
    .then(() => {
      res.redirect('/maps/myMaps');
    })
  });

  //WORKING test again
  router.post('/login/:id', (req, response) => {

    const userId = req.session.userId;

    getUserMaps(db, userId)
      .then(res => {
        if (req.session.userId) {

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
