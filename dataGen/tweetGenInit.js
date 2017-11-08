// only initiates generation which will then write the large store of tweets
const { tweetGen } = require('./tweetCreation.js');

// function tweetRun runs tweet generator
let tweetRun = (targetAmount) => {
  tweetGen(targetAmount);
};

tweetRun(2500000);
