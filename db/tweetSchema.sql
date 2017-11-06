DROP DATABASE IF EXISTS tweeter;

CREATE DATABASE tweeter;

\connect tweeter;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS tweets;

CREATE TABLE tweets (
  id serial PRIMARY KEY,
  tweet_id varchar (100),
  user_id integer,
  message varchar (255) NOT NULL,
  created_at varchar (100),
  updated_at varchar (100),
  impressions integer,
  views integer,
  likes integer,
  replies integer,
  retweets integer,
  type varchar (20)
);