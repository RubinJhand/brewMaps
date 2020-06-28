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

// const { db } = require('<ENTER PATH HERE BEFORE IMPLEMENTING>')

//Returns maps with the most likes
const getMostLikedMaps = function (db, mapId) {
  return db(`
    SELECT *
    FROM maps
    ORDER BY num_of_like DESC
  `, [mapId])
    .then(res => res.rows);
};

//Returns all the user's maps
const getUserMaps = function (db, userId) {
  return db(`
    SELECT *
    FROM maps
    WHERE userId = $1
    `, [userId])
    .then(res => res.rows);
};

//Returns all the user favourites and created
const getAllUserContributions = function (db, userId) {
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
const addMap = function (db, userId, description) {
  return db(`
    INSERT INTO maps (userId, description)
    VALUES ($1, $2)
    RETURNING *`, [userId, description])
    .then(res => res.rows);
};

//Favourite a map
const favMap = function (db, userId, mapId) {
  return db(`
    INSERT INTO favourite_maps (userId, mapId)
    VALUES ($1, $2)
    RETURNING *`, [userId, mapId])
    .then(res => res.rows);
};

//Returns maps not created by or favourited by user
const notUserMaps = function (db, userId) {
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