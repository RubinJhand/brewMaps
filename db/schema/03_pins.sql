DROP TABLE IF EXISTS pins CASCADE;

CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255),
  description VARCHAR(255),
  image TEXT,
  latitude REAL,
  longitude REAL
);