const express = require('express');
const {
  getUserId,
  getMostLikedMaps,
  getUserMaps,
  getAllUserContributions,
  notUserMaps,
  addMap,
  deleteMap,
  getPins,
  addPin } = require('./api/usersApi');
const { response } = require('express');
const router = express.Router();


module.exports = (db) => {
  router.get('/:mapId/pins', (req, res) => {
    const mapId = req.params.mapId;
    console.log("MAPID IS HERE ", mapId);
    getPins(db, mapId)
    .then(data => {
      res.json(data.rows);
    })
  })
  
  router.post('/:mapId/pins', (req, res) =>{
    addPin(db, req.body.title, "", "", req.body.lat, req.body.lng, req.session.userId, req.params.mapId)
      .then(() => {
        res.json({ success: true })
      })
  })
  return router;
}