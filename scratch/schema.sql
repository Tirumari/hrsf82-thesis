DROP DATABASE IF EXISTS tweeter;

CREATE DATABASE tweeter;

\connect tweeter;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
	id serial PRIMARY KEY,
	handle varchar (100) NOT NULL,
	name varchar (100) NOT NULL,
	timezone varchar(25), 
	publisher boolean
);

DROP TABLE IF EXISTS tweets;

CREATE TABLE tweets (
	id serial PRIMARY KEY,
    user_id integer REFERENCES users(id),
	message varchar (255) NOT NULL,
	created_at varchar (100) ,
	views integer,
	likes integer,
	retweets integer,
	replies integer,
	impressions integer
);