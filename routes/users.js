/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

//GETs all users information from database
module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        //client treats response string as valid JSON object; also returns response to the client
        //The methods are identical when an object or array is passed, but res.json() will also convert non-objects, such as null and undefined, which are not valid JSON.
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

// MOVE THESE EVENTUALLY
/*
// const { db } = require('<ENTER PATH HERE BEFORE IMPLEMENTING>')

//Returns maps with the most likes
const getMostLikedMaps = function (mapId) {
  return db(`
    SELECT *
    FROM maps
    ORDER BY num_of_like DESC
  `, [mapId])
    .then(res => res.rows);
};

//Returns all the user's maps
const getUserMaps = function (userId) {
  return db(`
    SELECT *
    FROM maps
    WHERE userId = $1
    `, [userId])
    .then(res => res.rows);
};

//Returns all the user favourites and created
const getAllUserContributions = function (userId) {
  return db(`
  SELECT *
  FROM maps WHERE userId = $1
    AND userId IN (
      SELECT *
      FROM favourite_maps
      WHERE userId = $1
    )
  )`, [userId])
    .then(res => res.rows);
};

//Adds a new map to the database
const addMap = function (userId, description) {
  return db(`
    INSERT INTO maps (userId, description)
    VALUES ($1, $2)
    RETURNING *`, [userId, description])
    .then(res => res.rows);
};

//Favourite a map
const favMap = function (userId, mapId) {
  return db(`
    INSERT INTO favourite_maps (userId, mapId)
    VALUES ($1, $2)
    RETURNING *`, [userId, mapId])
    .then(res => res.rows);
};

//Returns maps not created by or favourited by user
const notUserMaps = function (userId) {
  return db(`
    SELECT *
    FROM maps WHERE NOT userId = $1
      AND userId NOT IN (
        SELECT *
        FROM favourite_maps
        WHERE NOT userId = $1
      )
  )`, [userId])
    .then(res => res.rows);
};

module.exports = {
  getMostLikedMaps,
  getAllUserContributions,
  getUserMaps,
  addMap,
  favMap,
  notUserMaps
};

//Route skeletons - jumping off point
//add to server.js
//const <ROUTE1> = require('./routes/<ROUTE>');
//app.use('/<PATH>', <ROUTE(db));
router.get('/:user_id/maps', (req, res) => {

  const templateVars = {
    user: req.params.id
  };

  getUserMaps(req.params.id)
    .then(res => {

    })
    .then(res => {
      return getAllUserContributions(req.params.id);
    })
    .then(res => {
      templateVars.pins = res.rows[0];
      return res.render('maps', templateVars);
    });
});

router.post("/:user_id/maps/location", (req, response) => {
  const userId = req.session.user.id;
  const description = req.body.description;
  //create map if something entered
  addMap(userId, description)
    .then(res => {
      if (res.rows.length) {
        let mapId = res.rows[0]['id'];
        return response.redirect(`/:user_id/maps/${mapId}`);
      }
    });
});
*/