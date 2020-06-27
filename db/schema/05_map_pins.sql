DROP TABLE IF EXISTS map_pins CASCADE;

CREATE TABLE favourite_maps (
  pin_id INTEGER REFERENCES pins(id),
  map_id INTEGER REFERENCES maps(id)
);