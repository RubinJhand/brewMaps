DROP TABLE IF EXISTS favourite_maps CASCADE;

CREATE TABLE favourite_maps (
  user_id INTEGER REFERENCES users(id),
  map_id INTEGER REFERENCES maps(id)
);