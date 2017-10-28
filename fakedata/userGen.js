const faker = require('faker');
const fetch = require('isomorphic-fetch');
const promise = require('es6-promise');

// store of users
var users = [];
// store of handles
var handles = {};

// population of users
while (users.length < 500000) {
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



// var myInit = { method: 'PUT',
//                mode: 'cors',
//                cache: 'default',
//                data: users };

// fetch('http://localhost:3000/test', myInit)
//   .then((response) => {
//     console.log('fetch sent');
//   })