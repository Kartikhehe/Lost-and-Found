CREATE TABLE myschema.items (
  id SERIAL PRIMARY KEY,
  item_name VARCHAR(255),
  place_found VARCHAR(50),
  details TEXT,
  image TEXT
);