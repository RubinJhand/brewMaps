DROP TABLE IF EXISTS favourite_maps CASCADE;

CREATE TABLE favourite_maps (
  id SERIAL PRIMARY KEY NOT NULL,
<<<<<<< HEAD
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE
);
=======
  user_id INTEGER REFERENCES users(id),
  map_id INTEGER REFERENCES maps(id)
);
>>>>>>> f5654c1cc2360e6d7414aa7f690894ca39585ac5
