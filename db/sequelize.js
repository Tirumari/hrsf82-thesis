const Sequelize = require('sequelize');

const config = {
	"define": {
    "createdAt": "createdat",
    "timestamps": false,
    "userId": "userid"
  },
  "host": "localhost",
	"dialect": "postgres"
};

const sequelize = new Sequelize('home', 'home', '', config);

sequelize
  .authenticate()
  .then(() => {
    sequelize.sync();
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

 module.exports = sequelize;
