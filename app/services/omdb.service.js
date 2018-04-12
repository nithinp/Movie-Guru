'use strict';

const rp = require('request-promise');

const getOmdbData = (movieName) => {
  var options = {
    uri: 'https://omdbapi.com/',
    qs: {
      t: movieName,
      apikey: process.env.API_KEY
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };

  return rp(options)
    .then(function (data) {
      // console.log('\n\n\n\n\n\n\n', data, '\n\n\n\n\n\n\n\n\n\n\n');
      return data;
    })
    .catch(function (err) {
      return Promise.resolve(err);
    });
  // return Promise.resolve(movieName);
};

module.exports = {
  getOmdbData
};
