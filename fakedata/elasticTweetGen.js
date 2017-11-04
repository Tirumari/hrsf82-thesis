var elasticsearch = require('elasticsearch');
const faker = require('faker');

/*****************************************************
ELASTIC METHODS
*****************************************************/

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

/*****************************************************
 TWEET GEN
*****************************************************/

var elasticTweets = [];
var count = 0;
var total = 0;
var handles = {};

// setwaittime
const elasticWrite = (array) => {
  return new Promise(function(resolve,reject){
    // create new array, essentially doubling array length with index request object preceding each one
    var bulkArr = [];

    // for loop because I want to have an index to provide
    for (var i = 0; i < array.length; i++) {
      total++;
      bulkArr.push({ index: { _index: 'tweeter', _type: 'tweet', _id: total } }); // pushing request line
      bulkArr.push(array[i]); // pushing document
    }

    client.bulk({
      body: bulkArr
    }, function (err, resp) {
      if (err) {
        console.error('elasticsearch cluster is down!', err);
        reject(err);
      } else {
        console.log('successful tweet bulk insert: ' + total);
        resolve();
      }
    });
  });  
};

var elasticTweetRun = async (targetAmount) => {
  while (count < targetAmount) {
    var tweet = tweetGenerator();
  
    elasticTweets.push(tweet);
    count++;
    
    // 200
    if (elasticTweets.length === 5000) {
      await elasticWrite(elasticTweets);
      console.log('/*****************************WAITING: ' + count + '****************************/');
      elasticTweets = [];
    }

  }
}

elasticTweetRun(2500000);
