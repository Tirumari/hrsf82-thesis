const faker = require('faker');
const fetch = require('isomorphic-fetch');
const promise = require('es6-promise');

const db = require('../db/index.js')

// store of users
var users = [];
// store of handles
var handles = {};

db.clearUsers();

var count = 0;
// population of users
while (count < 500000) {
  var name = faker.name.findName();
  var handle = name.split(' ').join('') + Math.floor(Math.random() * 99);

  if (!handles[handle]) {
    handles[handle] = true;

    var user = {
      name: name,
      handle: handle,
      timezone: 'PST',
      publisher: false
    }

    users.push(user);
    count++;

    if (users.length === 5000) {
      console.log('5000 users! Count: ' + count);
      const write = async () => {
        await db.writeUsersBulk(users);
      }
      write();
      users = [];
    }
  }
}
