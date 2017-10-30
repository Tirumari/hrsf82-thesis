const sequelize = require('./sequelize.js');
const User = require('./models/user.js');
const Tweet = require('./models/tweet.js');

sequelize.sync();

Tweet.belongsTo(User, {foreignKey: 'user_id'});

module.exports = {
  clearUsers: function() {
    console.log('deleting users...');
    return User.destroy({
      where: {
        force: true
      }
    }).then(() => {
      console.log('deleted users!');
    })
  },

  clearTweets: function() {
    console.log('deleting Tweets')
    Tweet.destroy({
      where: {}
    })
  },

  // writeUsers: function(users) {
  //   users.forEach(async function (user) {
  //     await User.create(user).then(() => console.log(user));
  //   });
  // },

  writeUsersBulk: users => {
    User.bulkCreate(users);
  },

  writeTweetsBulk: tweets => {
    Tweet.bulkCreate(tweets)
      .catch(function() {
        console.log('promise rejected');
      });
  }
}
