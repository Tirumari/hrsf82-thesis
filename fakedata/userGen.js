const faker = require('faker');
const fetch = require('isomorphic-fetch');
const promise = require('es6-promise');

const csv = require('fast-csv');
const fs = require('file-system');
const ws = fs.createWriteStream('../db/userData.csv');

// const db = require('../db/index.js');
const { addUser } = require('../db/index.js');

// store of users
var users = [];
// store of handles
var handles = {};

// const clearUsersTable = async () => {
//   await db.clearUsers();;
// }

const write = async (handle, name, timezone, publisher) => {
  // await db.writeUsers(array);
  await addUser(handle, name, timezone, publisher);
};

var count = 0;
// population of users
while (count < 500000) {
  var name = faker.name.findName();
  var handle = name.split(' ').join('') + Math.floor(Math.random() * 99);

  if (!handles[handle]) {
    handles[handle] = true;
    count++;

    var user = {
      handle: handle,
      name: name,
      timezone: "PST",
      publisher: false
    }

    if (count % 5000 === 0) {
      console.log('5000 users! Count: ' + count);
    }

    users.push(user);

    write(user.handle, user.name, user.timezone, user.publisher);

    // if (users.length === 5) {
    //   console.log('5000 users! Count: ' + count);
    //   write(users);
    //   users = [];
    // }
  }
}

// csv.write(users, {headers:false}).pipe(ws);
