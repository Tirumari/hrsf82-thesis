var pg = require('pg');
var conString = "postgres://@localhost:5432/";

var client = new pg.Client(conString);

var begin = () => {
  client.connect();

  client.query('\c tweeter')
};

module.exports.insertUsers = function() {
  begin();

  client.query(`\copy users FROM "./userData.csv" WITH CSV;`).then(
    client.end()
  );
};

module.exports.inserTweets = function(tweets) {
  begin();



  client.end();
}
