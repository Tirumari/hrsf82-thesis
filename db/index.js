const sequelize = require('./sequelize.js');
const Tweet = require('./models/tweet.js');

const promise = require('es6-promise');

sequelize.sync();

module.exports = {
  clearUsers: function() {
    return new Promise(function(resolve, reject){
      Tweet.destroy({
        where: {}
      }).then(() => {
        console.log('deleting Tweets');
        resolve();
      })
    });
  },

  writeTweetsBulk: tweets => {
    return new Promise(function(resolve, reject){
      Tweet.bulkCreate(tweets).then(() => {
        resolve();
      });
    });
    
  }
}
