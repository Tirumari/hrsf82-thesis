var pg = require('pg');
var conString = "postgres://@localhost:5432/";

var client = new pg.Client(conString);

var begin = () => {
  client.connect();

  client.query('\connect tweeter')
};

module.exports.insertUsers = (users) {
  begin();

  

  client.end();
};
