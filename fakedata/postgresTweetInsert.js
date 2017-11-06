const promise = require('es6-promise');

/************************************************************************
POSTGRES METHODS
************************************************************************/

const { Pool, Client } = require('pg');

var pool = new Pool({
  database: 'tweeter',
  password: ''
});

const client = new Client({
  database: 'tweeter',
  password: ''
});

client.connect();

pool.connect(function(err, client, done) {
  if (err) {
    console.log('could not connect');
  } else {
    console.log('connected to db');
    done();
  }
})

module.exports.postgresWrite = function(tweet, count) {
  return new Promise(function(resolve, reject){
    const text = 'INSERT INTO tweets (tweet_id, user_id, message, created_at, updated_at, impressions, views, likes, replies, retweets, type) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)'
    const values = [tweet.tweet_id, tweet.user_id, tweet.message, tweet.created_at, tweet.updated_at, tweet.impressions, tweet.views, tweet.likes, tweet.replies, tweet.retweets, tweet.type];
    
    client.query(text, values, (err, res) => {
      if (err) {
        console.log('error inserting into db', err);
        reject(err);
      } else {
        console.log('successful postgres insert! Count: ' + count);
        resolve();
      } 
    });
  });
}
