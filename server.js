// load .env data into process.env
require('dotenv').config();
// Web server config
const PORT = process.env.PORT || 8080;
const KEY = process.env.KEY;
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session')
const sass = require('node-sass-middleware');
const app = express();
const morgan = require('morgan');
// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))
app.use('/styles', sass({
  src: __dirname + '/styles',
  dest: __dirname + '/public/styles',
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static('public'));

const usersRoute = require('./routes/usersRoute');
const mapsRoute = require('./routes/mapsRoute');
const pinsRoute = require('./routes/pinsRoute');
const { getMostLikedMaps } = require('./routes/api/mapsApi');

app.use('/', usersRoute(db));
app.use('/maps', mapsRoute(db));
app.use('/maps', pinsRoute(db));
// Home page
app.get('/', (req, res) => {
  if (req.session.userId) {
    getMostLikedMaps(db)
      .then(result => {
        const user = req.session.userId;
        let maps = result.rows;
        res.render('index', { maps, user, KEY });
      });
  } else {
    getMostLikedMaps(db)
      .then(result => {
        const user = 3;
        req.session.userId = user;
        let maps = result.rows;
        res.render('index', { maps, user, KEY });
      })
      .catch(err => console.error(err.stack));
  }
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});