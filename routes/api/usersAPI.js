
const getUserId = function (db, userId) {
  return db.query(`
    SELECT *
    FROM users
    WHERE id = $1
    `, [userId])
};

module.exports = {
  getUserId
};
