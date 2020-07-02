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
  addPin } = require('./api/usersApi');
const { response } = require('express');
const router = express.Router();


module.exports = (db) => {
  router.get('/:mapId/pins', (req, res) => {
    const mapId = req.params.mapId;
    getPins(db, mapId)
    .then(data => {
      res.json(data.rows);
    })
  })

  router.post('/:mapId/pins', (req, res) =>{
    addPin(db, req.body.title, "", "", req.body.lat, req.body.lng, req.session.userId, req.params.mapId)
      .then((data) => {
        // console.log(data.rows[0]);
        const pin = data.rows[0];
        res.json({pin})
      })
  })

   router.post(`/pins/:pinId/delete`, (req, res) => {
    const pinId = req.params.pinId;
    console.log("PIN ID IS HERE ", pinId);

    deletePin(db, pinId)
      .then(() =>{
        res.json({ success: true })
      })
  });
  return router;
}
