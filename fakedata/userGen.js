const faker = require('faker');

// store of users
var users = [];
// store of handles
var handles = {};

// population of users
while (users.length < 10) {
  var name = faker.name.findName();
  var handle = name.split(' ').join('') + Math.floor(Math.random() * 99);

  if (!handles[handle]) {
    handles[handle] = true;

    users.push({
      name: name,
      handle: handle,
      timezone: 'PST',
      publisher: false
    });
  }
}
