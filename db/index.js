const sequelize = require('./sequelize.js');
const User = require('./models/user.js');
const Tweet = require('./models/tweet.js');

sequelize.sync();

Tweet.belongsTo(User, {foreignKey: 'user_id'});

module.exports = {
  clearUsers: function() {
    console.log('deleting Users')
    User.destroy({
      where: {}
    })
  },

  // writeUsers: function(users) {
  //   users.forEach(async function (user) {
  //     await User.create(user).then(() => console.log(user));
  //   });
  // },

  writeUsersBulk: users => {
    return User.bulkCreate(users);
  }
}
