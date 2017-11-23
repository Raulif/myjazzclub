DROP TABLE IF EXISTS pictures;

CREATE TABLE pictures (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    description VARCHAR,
    picture_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
