const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

const User = sequelize.define('user', {
  name: {
		type: Sequelize.STRING
	},
	handle: {
		type: Sequelize.STRING
	},
	timezone: {
		type: Sequelize.STRING
	},
	publisher: {
		type: Sequelize.BOOLEAN
	}
});

// // force: true will drop the table if it already exists
// User.sync({force: true}).then(() => {
//   // Table created
//   return User.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   });
// });

module.exports = User;
