const { Pool, Client } = require('pg');

var pool = new Pool({
    database: 'tweeter',
    password: ''
  })
  
const client = new Client({
  database: 'tweeter',
  password: ''
})
client.connect();

pool.connect(function(err, client, done) {
    if (err) {
        console.log('could not connect');
    }
    console.log('connected to db');
    done()
})

var addUser = function(handle, name, timezone, publisher) {
  const text = 'INSERT INTO users (handle, name, timezone, publisher) VALUES($1, $2, $3, $4)'
  const values = [handle, name, timezone, publisher];
  
  client.query(text, values, (err, res) => {
      if (err) {
      console.log('error inserting into db', err);
      } 
  })
}

var addTweet = function(user_id, message, created_at, views, likes, retweets, replies, impressions) {
    const text = 'INSERT INTO tweets (user_id, message, created_at, views, likes, retweets, replies, impressions) VALUES($1, $2, $3, $4, $5, $6, $7, $8)'
    const values = [user_id, message, created_at, views, likes, retweets, replies, impressions];
    
    client.query(text, values, (err, res) => {
        if (err) {
        console.log('error inserting into db', err);
        } else {
            console.log('inserted tweet');
            
        }
    })
}


module.exports.addUser = addUser;
module.exports.addTweet = addTweet;
// module.exports.insertFollow = insertFollow;

// // const sequelize = require('./sequelize.js');
// const User = require('./models/user.js');
// const Tweet = require('./models/tweet.js');

// const { Client } = require('pg')
// const client = new Client();

// client.connect();

// module.exports = {
//   clearUsers: function() {
//     console.log('deleting users...');
//     return User.destroy({
//       where: {
//         force: true
//       }
//     }).then(() => {
//       console.log('deleted users!');
//     })
//   },

//   clearTweets: function() {
//     console.log('deleting Tweets')
//     Tweet.destroy({
//       where: {}
//     })
//   },

//   writeUsers: function(users) {
//     client.query('\c tweeter');

//     users.forEach(async function (user) {
//       console.log(user);
//       client.query('INSERT INTO users (handle, name, timezone, publisher) VALUES (3, "tirumari89", "tirumari", "false")');
//     });

//     client.end();
//   }

//   // writeUsersBulk: users => {
//   //   User.bulkCreate(users);
//   // },

//   // writeTweetsBulk: tweets => {
//   //   Tweet.bulkCreate(tweets)
//   //     .catch(function() {
//   //       console.log('promise rejected');
//   //     });
//   // }
// }
