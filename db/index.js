const sequelize = require('./sequelize.js');
const User = require('./models/user.js');
const Tweet = require('./models/tweet.js');

sequelize.sync();

Tweet.belongsTo(User, {foreignKey: 'user_id'});

User.findAll({
  attributes: ['name', 'handle']
});

module.exports.User = User;
