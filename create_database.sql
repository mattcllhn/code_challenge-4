-- Database name

-- Document you create tables pSQL here
CREATEDB dessertDB;

CREATE TABLE treat(
	id SERIAL PRIMARY KEY,
	name VARCHAR(30),
	description VARCHAR(150),
	pic VARCHAR(1500)
);
