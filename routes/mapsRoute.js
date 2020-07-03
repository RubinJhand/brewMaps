const KEY = process.env.KEY;
const express = require('express');
const { getUserMaps } = require('./api/mapsApi');
const router = express.Router();

module.exports = (db) => {

  router.get('/myMaps', (req, res) => {
    const user = req.session.userId;
    console.log('\n\nuser:>>>>', user)
    getUserMaps(db, user)
      .then(data => {
        const maps = data.rows
        return res.render('favMaps', { maps, user, KEY });
      })
  });
  return router;
};