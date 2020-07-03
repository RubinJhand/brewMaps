const express = require('express');
const {
  getUserId,
  getMostLikedMaps,
  getUserMaps,
  getAllUserContributions,
  notUserMaps,
  addMap,
  deleteMap,
  deletePin,
  getPins,
  updatePin,
  addPin } = require('./api/usersApi');
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

  router.post(`/pins/edit`, (req, res) => {
    updatePin(db, req.body.pinId, req.body['shop-name'])
      .then(() => {
        res.json({ success: true })
      });
  });

  router.get('/:mapId/pins', (req, res) => {
    const mapId = req.params.mapId;
    getPins(db, mapId)
      .then(data => {
        res.json(data.rows);
      });
  });

  router.post('/:mapId/pins', (req, res) => {
    addPin(db, req.body.title, "", "", req.body.lat, req.body.lng, req.session.userId, req.params.mapId)
      .then((data) => {
        const pin = data.rows[0];
        res.json({ pin })
      });
  });

  router.post(`/pins/:pinId/delete`, (req, res) => {
    const pinId = req.params.pinId;
    deletePin(db, pinId)
      .then(() => {
        res.json({ success: true })
      });
  });
  return router;
};