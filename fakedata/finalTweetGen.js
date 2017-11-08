// require methods
const uuidv4 = require('uuid/v4');
const messageParts = require('./messageElements.js')

/* TWEET GEN ****************************************************/
var randomElement = function(arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

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

// message body
var messageGenerator = function() {
  var message = [randomElement(messageParts.opening), randomElement(messageParts.verbs), randomElement(messageParts.objects), randomElement(messageParts.nouns), randomElement(messageParts.tags)];

  if (messageParts.properNouns.includes(message[3]) && message[2][0] !== 'a') {
    message.splice(2, 1);
  }

  return message.join(' ').trim();
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
    message: messageGenerator(),
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

// write tweets to databases
  // postgres
  // elasticsearch
