DROP TABLE IF EXISTS pets;

CREATE TABLE pets (
    pet_id SERIAL PRIMARY KEY,
    age INTEGER,
    kind VARCHAR(50),
    name VARCHAR(50)
);

INSERT INTO pets (age,kind,name) VALUES(5, 'monkey', 'tyler');
INSERT INTO pets (age,kind,name) VALUES(10, 'dog', 'bonJovi');
INSERT INTO pets (age,kind,name) VALUES(99, 'koala', 'Paula');
INSERT INTO pets (age,kind,name) VALUES(887, 'lemur', 'yuppy');