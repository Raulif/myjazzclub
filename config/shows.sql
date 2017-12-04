DROP TABLE IF EXISTS shows;

CREATE TABLE shows (
    id SERIAL PRIMARY KEY,
    main_artist VARCHAR NOT NULL,
    secondary_artist VARCHAR,
    long_description TEXT,
    genre VARCHAR,
    show_date DATE,
    time_begin VARCHAR,
    time_end VARCHAR,
    price_pre VARCHAR,
    price_door VARCHAR,
    tag VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    external_link TEXT,
    line_up VARCHAR,
    title VARCHAR NOT NULL,
    picture_name TEXT
);
