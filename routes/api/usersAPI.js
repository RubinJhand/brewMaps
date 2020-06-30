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
    ORDER BY num_of_like DESC
  `);

};

//Returns all the user's maps
const getUserMaps = function (db, userId) {
  return db.query(`
      SELECT *
      FROM maps
      WHERE user_id = $1
      `, [userId])
    .then(res => res.rows);
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

//Returns maps not created by or favourited by user
const notUserMaps = function (db, userId) {
  return db.query(`
    SELECT *
    FROM maps
    JOIN favourite_maps
    ON maps.user_id = favourite_maps.user_id
    WHERE NOT maps.id = favourite_maps.map_id
    AND NOT favourite_maps.user_id = $1
    ORDER BY num_of_like ASC
    
  `, [userId])
  // .then(res => res.rows);
};

module.exports = {
  getUserId,
  getMostLikedMaps,
  getUserMaps,
  getAllUserContributions,
  notUserMaps
};