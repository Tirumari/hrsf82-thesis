const express = require('express');
const Sequelize = require('sequelize');
var db = require('./index.js');
var sequelize = require('./sequelize');

var elasticsearch = require('elasticsearch');

/*****************************************************
ELASTIC METHODS
*****************************************************/

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

/*****************************************************
ELASTIC INSERT
*****************************************************/

module.exports = {
  elasticWrite: (array) => {
    return new Promise(function(resolve,reject){
      // create new array, essentially doubling array length with index request object preceding each one
      var bulkArr = [];
      var total = 0;

      // for loop because I want to have an index to provide
      for (var i = 0; i < array.length; i++) {
        total++;
        bulkArr.push({ index: { _index: 'tweeter', _type: 'tweet', _id: total } }); // pushing request line
        bulkArr.push(array[i]); // pushing document
      }

      client.bulk({
        body: bulkArr
      }, function (err, resp) {
        if (err) {
          console.error('elasticsearch cluster is down!', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });  
  }
}
