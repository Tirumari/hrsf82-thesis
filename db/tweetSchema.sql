DROP DATABASE IF EXISTS tweeter;

CREATE DATABASE tweeter;

\connect tweeter;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS tweets;
g
CREATE TABLE tweets (
  tweet_id varchar (100) PRIMARY KEY,
  user_id integer,
  message varchar (255),
  created_at varchar (100),
  updated_at decimal,
  impressions integer,
  views integer,
  likes integer,
  replies integer,
  retweets integer,
  type varchar (20)
);