// generates the actual tweets
const uuidv4 = require('uuid/v4');
const { messageGen } = require('./messageGenerator.js');

/**************************************************************
TWEET ELEMENTS
**************************************************************/

var numberGenerator = function(n) {
  return Math.floor(Math.random() * n);
};

// tweet user id
var userGenerator = function() {
  var user = numberGenerator(2001);
  while (user === 0) {
    user = numberGenerator(2001);
  }
  return user;
};

// created_at date
var dateGenerator = function() {
  // Only produce dates from August - October 2017
  return Math.floor(Math.random() * (1509519599001 - 1501570800000) + 1501570800000).toString();
};

// type: 'original' or 'retweet' or 'reply'
var typeGenerator = function() {
  var type = 'original';
  var chance = numberGenerator(100);

  // 5% retweets, 25% replies
  if (chance < 5) {
    type = 'retweet';
  } else if (5 <= chance < 30) {
    type = 'reply';
  }

  return type;
};

/**************************************************************
TWEET GENERATOR
**************************************************************/

module.exports.tweetGenerator = function() {
  // generation of reasonable metrics
  var impressions = numberGenerator(5000000);
  var views = Math.floor((impressions / 10) * Math.random());
  var likes = Math.floor((impressions / 50) * Math.random());
  var replies = Math.floor((impressions / 500) * Math.random());
  var retweets = Math.floor((impressions / 250) * Math.random());

  // generation of tweets
  var tweet = {
    tweet_id: uuidv4().toString(),
    user_id: userGenerator().toString(),
    message: messageGen(),
    created_at: dateGenerator(),
    updated_at: new Date().valueOf() / 10000000,
    impressions: impressions,
    views: views,
    likes: likes,
    replies: replies,
    retweets: retweets,
    type: typeGenerator()
  };

  return tweet;
}
