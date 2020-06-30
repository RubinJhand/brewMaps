//intitial testing, add 'id' after 'db' if/when getting user by ID
const getUserId = function (db, placeholder) {
  return db.query(`
    SELECT *
    FROM users`)
};

//Returns maps with the most likes
const getMostLikedMaps = function (db) {
  return db.query(`
    SELECT *
    FROM maps
    ORDER BY num_like DESC
  `)
  // .then(res => res.rows);
};

//Returns all the user's maps
const getUserMaps = function (db, userId) {
  return db.query(`
      SELECT *
      FROM maps
      WHERE user_id = $1
      `, [userId])
  // .then(res => res.rows);
};

//Returns all the user favourites and created
const getAllUserContributions = function (db, userId) {
  return db.query(`
    SELECT DISTINCT *
    FROM maps
    JOIN favourite_maps AS fav_maps
      ON maps.user_id = fav_maps.user_id
    WHERE fav_maps.user_id = $1
    `, [userId])
  // .then(res => res.rows);
};

//Returns maps not created by or favourited by user CHANGE
const notUserMaps = function (db, userId) {
  return db.query(`
    SELECT *
    FROM maps
    JOIN favourite_maps
    ON maps.user_id = favourite_maps.user_id
    WHERE NOT maps.id = favourite_maps.map_id 
    AND NOT favourite_maps.user_id = $1
    ORDER BY num_like ASC
    `, [userId])
  // .then(res => res.rows);
};

//Create map; add to database
const addMap = function (db, user_id, title, num_like) {
  return db.query(`
    INSERT INTO maps (user_id, title, num_like)
    VALUES
    ($1, $2, $3)
    RETURNING *
    `, [user_id, title, num_like]);
};

//Create pin; add to database
const addPin = function (db, title, description, image, latitude, longitude, user_id, map_id) {
  return db.query(`
    INSERT INTO pins (title, description, image, latitude, longitude, user_id, map_id)
    VALUES 
    ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `, [title, description, image, latitude, longitude, user_id, map_id]);
};

module.exports = {
  getUserId,
  getMostLikedMaps,
  getUserMaps,
  getAllUserContributions,
  notUserMaps,
  addMap,
  addPin
};