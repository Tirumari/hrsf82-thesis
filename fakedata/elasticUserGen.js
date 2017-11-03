var elasticsearch = require('elasticsearch');
const faker = require('faker');

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

/*****************************************************
 USERGEN
*****************************************************/

var elasticUsers = [];
var count = 0;
var handles = {};

const elasticWrite = (array, currentCount) => {
  // create new array, essentially doubling array length with index request object preceding each one
  var bulkArr = [];

  // for loop because I want to have an index to provide
  for (var i = currentCount; i < array.length + currentCount; i++) {
    console.log(i);
    var actualInd = i - currentCount;
    bulkArr.push({ index: { _index: 'tweeter', _type: 'user', _id: i } }); // pushing request line
    bulkArr.push(array[actualInd]); // pushing document
  }

  client.bulk({
    body: bulkArr
  }, function (err, resp) {
    if (err) {
      console.error('elasticsearch cluster is down!', err);
    } else {
      console.log('successful bulk insert');
    }
  });

  // await array.forEach(user => {
  //   client.bulk({
  //     body: [
  //       // action description
  //       { index: { _index: 'tweeter', _type: 'user', _id: count } },
  //       // the document to index
  //       {
  //         handle: user.handle,
  //         name: user.name,
  //         timezone: user.timezone,
  //         publisher: user.publisher
  //       },
  //       // hope this works
  //     ]
  //   }, function (err, resp) {
  //     if (err) {
  //       console.error('elasticsearch cluster is down!', err);
  //     } else {
  //       console.log('successful bulk insert');
  //     }
  //   });
  // });
  
};

var run = async () => {
  while (count < 500000) {
    var name = faker.name.findName();
    var handle = name.split(' ').join('') + Math.floor(Math.random() * 99);
  
    if (!handles[handle]) {
      handles[handle] = true;
      count++;
  
      var user = {
        handle: handle,
        name: name,
        timezone: "PST",
        publisher: false
      };
      count++;
  
      elasticUsers.push(user);
      
      if (elasticUsers.length === 200) {
        await elasticWrite(elasticUsers, count);
        elasticUsers = [];
      }
    }
  }
}

run();