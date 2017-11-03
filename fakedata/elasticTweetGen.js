var elasticsearch = require('elasticsearch');
const faker = require('faker');
const tweetGen = require('./tweetGen.js')

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

/*KIBANA CONSOLE COMMAND**************************/
// PUT tweeter 
// {
//   "mappings": {
//     "user": {
//       "_all":       { "enabled": false }, 
//       "properties": {
//         "handle":   { "type": "text" },
//         "name":    { "type": "text" }, 
//         "timezone":     { "type": "text" }, 
//         "publisher":      { "type": "boolean" }
//       }
//     },
//     "blogpost": {
//       "_all":       { "enabled": false }, 
//       "properties": {
//         "user_id":   { "type": "integer" },
//         "message":   { "type": "text" },
//         "created_at":  { "type":   "date" },
//         "views": { "type": "integer" },
//         "likes": { "type": "integer" },
//         "retweets": { "type": "integer" },
//         "replies": { "type": "integer" },
//         "impressions": { "type": "integer" }
//       }
//     }
//   }
// }

/*****************************************************
 TWEETGEN
*****************************************************/


