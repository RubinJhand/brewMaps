//Create pin; add to database
const addPin = function (db, title, description, image, latitude, longitude, user_id, map_id) {
  return db.query(`
    INSERT INTO pins (title, description, image, latitude, longitude, user_id, map_id)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `, [title, description, image, latitude, longitude, user_id, map_id]);
};

const getPins = function (db, mapId) {
  return db.query(`
    SELECT pins.*
    FROM pins
    WHERE pins.map_id = $1
    ORDER BY id
  `, [mapId]);
};

const updatePin = function (db, pinId, title) {
  return db.query(`
    UPDATE pins
    SET title = $1
    WHERE id = $2`,
    [title, pinId]);
}

const deletePin = function (db, pinId) {
  return db.query(`
    DELETE FROM pins
    WHERE id=$1
  `, [pinId]);
};

module.exports = {
  addPin,
  getPins,
  deletePin,
  updatePin
};