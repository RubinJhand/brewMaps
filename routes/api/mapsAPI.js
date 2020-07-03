//Returns maps with the most likes
const getMostLikedMaps = function (db) {
  return db.query(`
    SELECT *
    FROM maps
    ORDER BY num_like DESC
  `)
};

//Returns all the user's maps
const getUserMaps = function (db, userId) {
  return db.query(`
      SELECT *
      FROM maps
      WHERE user_id = $1
      ORDER BY id DESC
      `, [userId])
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
};

//Create map; add to database
const addMap = function (db, user_id, title) {
  return db.query(`
    INSERT INTO maps (user_id, title)
    VALUES
    ($1, $2)
    RETURNING *
    `, [user_id, title]);
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
};

const deleteFav = function (db, userId, mapId) {
  return db.query(`
    DELETE FROM favourite_maps
      WHERE user_id = $1
      AND map_id = $2
    `, [userId, mapId]);
};

const deleteMap = function (db, userId, map_id) {
  return db.query(`
    DELETE FROM maps
      WHERE user_id = $1
      AND id = $2
    `, [userId, map_id]);
};

module.exports = {
  getMostLikedMaps,
  getUserMaps,
  getAllUserContributions,
  notUserMaps,
  addMap,
  deleteFav,
  deleteMap
};
