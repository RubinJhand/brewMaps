const express = require('express');
const { getUserMaps } = require('./api/mapsApi');
const { response } = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get('/myMaps', (req, res) => {
    const user = req.session.userId;
    getUserMaps(db, user)
      .then(data => {
        const maps = data.rows
        return res.render('favMaps', { maps, user });
      })
  });
  return router;
};