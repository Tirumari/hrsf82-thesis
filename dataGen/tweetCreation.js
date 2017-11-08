const { tweetGenerator } = require('./tweetGenerator.js');
let db = require('../db/index.js');
let dbElastic = require('../db/elasticIndex.js');

let tweets = [];
let count = 0;

module.exports.tweetGen = async (targetAmount) => {
  // clear postgres
  // await db.clearUsers();

  while (count < targetAmount) {
    var tweet = tweetGenerator();
    tweets.push(tweet);
    count++;
    // set timestamps
    if (count === 1) {
      var x = new Date();
      console.log('/**************************************************************\nSTART TIME: ' + x + '\n**************************************************************/');
    } else if (count === targetAmount) {
      var y = new Date();
      console.log('/**************************************************************\nEND TIME: ' + y + '\n**************************************************************/');
    }

    // data insertion

    if (tweets.length === 5000) {
      console.log('/**************************************************************\n5,000 MORE TWEETS! COUNT: ' + count + '\n**************************************************************/');
      // await postgres insert of tweets
      await db.writeTweetsBulk(tweets);
      // await elastic insert of tweets
      await dbElastic.elasticWrite(tweets);

      tweets = [];
    }
  }
};