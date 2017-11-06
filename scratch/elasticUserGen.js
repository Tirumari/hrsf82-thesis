var elasticsearch = require('elasticsearch');
const faker = require('faker');
const promise = require('es6-promise');

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
 USER GEN
*****************************************************/

var elasticUsers = [];
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
      bulkArr.push({ index: { _index: 'tweeter', _type: 'user', _id: total } }); // pushing request line
      bulkArr.push(array[i]); // pushing document
    }

    client.bulk({
      body: bulkArr
    }, function (err, resp) {
      if (err) {
        console.error('elasticsearch cluster is down!', err);
        reject(err);
      } else {
        console.log('successful bulk insert: ' + total);
        resolve();
      }
    });
  });  
};

var elasticUserRun = async (targetAmount) => {
  while (count < targetAmount) {
    var name = faker.name.findName();
    var handle = name.split(' ').join('') + Math.floor(Math.random() * 99);
  
    if (!handles[handle]) {
      handles[handle] = true;
  
      var user = {
        handle: handle,
        name: name,
        timezone: "PST",
        publisher: false
      };
  
      elasticUsers.push(user);
      count++;
      
      // 200
      if (elasticUsers.length === 5000) {
        await elasticWrite(elasticUsers);
        console.log('/*****************************WAITING: ' + count + '****************************/');
        elasticUsers = [];
      }
    }
  }
}

elasticUserRun(500000);

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
//     "tweet": {
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
