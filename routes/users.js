/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
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

//Returns all the user's maps
const getUserMaps = function (db, userId) {
  return db.query(`
    SELECT *
    FROM maps
    WHERE userId = $1
    `, [userId]);
};

//Adds a new map to the database
const addMap = function (db, userId, description) {
  return db.query(`
    INSERT INTO maps (userId, description)
    VALUES ($1, $2)
    RETURNING *`, [userId, description]);
};

//Favourite a map
const favMap = function (db, userId, mapId) {
  return db.query(`
    INSERT INTO favourite_maps (userId, mapId)
    VALUES ($1, $2)
    RETURNING *`, [userId, mapId]);
};

//Returns maps not created by or favourited by user
const notUserMaps = function (db, userId) {
  return db.query(`
    SELECT *
    FROM maps WHERE NOT userId = $1
      AND userId NOT IN (
        SELECT *
        FROM favourite_maps
        WHERE NOT userId = $1
      )
  )`, [userId]);
};