const finalTweetGen = require('./finalTweetGen.js');
const postgresTweetInsert = require('./postgresTweetInsert.js');

var tweets = [];
var count = 0;

tweetRun = async (targetAmount) => {
  while (count < targetAmount) {
    if (count % 5000 === 0) {
      console.log(`generated 5000 tweets! Count: ` + count);
    }

    var tweet = finalTweetGen.tweetGenerator();
    tweets.push(tweet);
    await postgresTweetInsert.postgresWrite(tweet, count);
    count++
  }
};

tweetRun(2500000);

