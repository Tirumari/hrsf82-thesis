const express = require('express');
const path = require('path');
// for test
const uuidv4 = require('uuid/v4');
// for test
const AWS = require('aws-sdk');
AWS.config.loadFromPath('../config.json');
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const queueUrl = require('../config.js').queueUrl;

/* EXPRESS CONNECTIONS **************************************************************************************************************************/

const app = express();
app.use(express.static(path.join(__dirname, '../client/dist/')));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });

/* SQS SENDING **********************************************************************************************************************************/

let testObj = {
  'test': 'TEST'
};

let messageBod = JSON.stringify(testObj);

let params = {
  MessageDeduplicationId: uuidv4().toString(),
  MessageGroupId: 'tweet',
  MessageBody: messageBod,
  QueueUrl: queueUrl
};

sqs.sendMessage(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.MessageId);
  }
});

app.post('/data', function(req, res) {
  console.log(req);
  res.send(req);
})
