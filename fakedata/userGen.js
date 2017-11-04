const faker = require('faker');
const fetch = require('isomorphic-fetch');
const promise = require('es6-promise');

/************************************************************************
POSTGRES METHODS
************************************************************************/

const { Pool, Client } = require('pg');

var pool = new Pool({
    database: 'tweeter',
    password: ''
  })
  
const client = new Client({
  database: 'tweeter',
  password: ''
})
client.connect();

pool.connect(function(err, client, done) {
    if (err) {
        console.log('could not connect');
    }
    console.log('connected to db');
    done()
})

/************************************************************************
USER GEN
************************************************************************/

const write = (handle, name, timezone, publisher, count) => {
  return new Promise(function(resolve, reject){
    const text = 'INSERT INTO users (handle, name, timezone, publisher) VALUES($1, $2, $3, $4)'
    const values = [handle, name, timezone, publisher];
    
    client.query(text, values, (err, res) => {
      if (err) {
        console.log('error inserting into db', err);
        reject(err);
      } else {
        console.log('successful POSTGRES insert with batch: ' + count);
        resolve();
      } 
    });
  });
};


// store of users
var users = [];
// store of handles
var handles = {};
var count = 0;

// population of users
var userRun = async () => {
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

      await write(user.handle, user.name, user.timezone, user.publisher, count);
    }
  }
};

userRun();
