DROP TABLE IF EXISTS pins CASCADE;

CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255),
  description VARCHAR(255),
  image TEXT,
  latitude REAL,
  longitude REAL,
<<<<<<< HEAD
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE
);
=======
  user_id INTEGER REFERENCES users(id),
  map_id INTEGER REFERENCES maps(id)
);
>>>>>>> f5654c1cc2360e6d7414aa7f690894ca39585ac5
