-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS dogs;
DROP TABLE IF EXISTS bikes;
DROP TABLE IF EXISTS movies;

CREATE TABLE dogs (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL
);

CREATE TABLE bikes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    brand TEXT NOT NULL,
    type TEXT NOT NULL
);

CREATE TABLE movies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    genre TEXT NOT NULL
)