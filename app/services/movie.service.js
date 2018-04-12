'use strict';

const _ = require('lodash');
const omdbService = require('./omdb.service');
const strHelper = require('../utils/string.helper');

const getMovieDescription = (movieName) => {

  return omdbService.getOmdbData(movieName)
    .then((data) => {
      if (data.Response === 'True') {
        let description = '';
        description = '<s>' + description + data.Title + ' is a ' +
          data.Year + ' ' + strHelper.modifyStrForVoice(data.Language) +
          ' movie' + (strHelper.modifyStrForVoice(data.Director) ?
            ' directed by ' + strHelper.modifyStrForVoice(data.Director) +
            '.</s>' : '.</s>') + (getRatingOfTheMovie(data) ?
            ' <s> The movie has ' + getRatingOfTheMovie(data) +
            '.</s>' : '') + (isValid(data.Plot) ? ' <s> The plot of the movie is ' +
            data.Plot + '.</s>' : '') + (isValid(data.Runtime) ?
            ' <s> The running time of the movie is ' +
            getRunningTime(data.Runtime) + '.</s>' : '');

        return Promise.resolve(description);
      } else {
        return Promise.reject();
      }
    });
};

const getMovieDirector = (movieName) => {

  return omdbService.getOmdbData(movieName)
    .then((data) => {
      if (data.Response === 'True') {
        let description = '';
        if (isValid(data.Director)) {
          description = '<s>' + movieName + ' is directed by ' +
            strHelper.modifyStrForVoice(data.Director) + '</s>';
        } else {
          description = '<s>  Sorry, I do not have the information you asked for right now </s>';
        }
        return Promise.resolve(description);
      } else {
        return Promise.reject();
      }
    });
};

const getMovieRunTime = (movieName) => {
  return omdbService.getOmdbData(movieName)
    .then((data) => {
      if (data.Response === 'True') {
        let description = '';
        if (isValid(data.Runtime)) {
          description = '<s>The running time of ' + movieName +
            ' is ' + getRunningTime(data.Runtime) + '.</s>'
        } else {
          description = '<s>  Sorry, I do not have the information you asked for right now </s>';
        }
        return Promise.resolve(description);
      } else {
        return Promise.reject();
      }
    });
};

const getMovieReleaseDate = (movieName) => {
  return omdbService.getOmdbData(movieName)
    .then((data) => {
      if (data.Response === 'True') {
        let description = '';
        if (isValid(data.Released)) {
          description = '<s> ' + movieName +
            ' was released on ' + data.Released + '.</s>'
        } else {
          description = '<s>  Sorry, I do not have the information you asked for right now </s>';
        }
        return Promise.resolve(description);
      } else {
        return Promise.reject();
      }
    });
};

const getMoviePlot = (movieName) => {
  return omdbService.getOmdbData(movieName)
    .then((data) => {
      if (data.Response === 'True') {
        let description = '';
        if (isValid(data.Plot)) {
          description = '<s>The plot of ' + movieName +
            ' is ' + data.Plot + '.</s>'
        } else {
          description = '<s>  Sorry, I do not have the information you asked for right now </s>';
        }
        return Promise.resolve(description);
      } else {
        return Promise.reject();
      }
    });
};

const getMovieRating = (movieName) => {
  return omdbService.getOmdbData(movieName)
    .then((data) => {
      if (data.Response === 'True') {
        let description = '';
        description = ' <s> ' + movieName + ' has ' + getRatingOfTheMovie(data) +
          '.</s>'

        return Promise.resolve(description);
      } else {
        return Promise.reject();
      }
    });
};

const getMovieCast = (movieName) => {
  return omdbService.getOmdbData(movieName)
    .then((data) => {
      if (data.Response === 'True') {
        let description = '';
        if (isValid(data.Actors)) {
          description = ' <s> ' + movieName + "'s cast members are " +
            strHelper.modifyStrForVoice(data.Actors) + '.</s>'
        } else {
          description = '<s> Sorry, I do not have the information you asked for right now </s>';
        }
        return Promise.resolve(description);
      } else {
        return Promise.reject();
      }
    });
};


module.exports = {
  getMovieDescription,
  getMovieDirector,
  getMovieRunTime,
  getMovieReleaseDate,
  getMoviePlot,
  getMovieRating,
  getMovieCast
};

// Helper function

const getRunningTime = (runTime) => {
  let runRimeStr = '';
  if (!!runTime) {
    try {
      runTime = parseInt(runTime.split(' ')[0]);
      if (runTime < 60) {
        runRimeStr = runRimeStr + runTime + ' minutes'
      } else {
        const hour = Math.floor(runTime / 60);
        const mins = runTime % 60;
        runRimeStr = runRimeStr + hour + ' hours and ' + mins + ' minutes'
      }
      return runRimeStr;
    } catch (e) {
      return runRimeStr;
    }
  }
};

const getRatingOfTheMovie = (data, source) => {
  let ratingStr = '';
  const imdbArray = _.filter(data.Ratings, ['Source', 'Internet Movie Database']);
  const rtArray = _.filter(data.Ratings, ['Source', 'Rotten Tomatoes']);
  if (source === 'imdb') {
    if (imdbArray.length > 0) {
      ratingStr = ratingStr = 'an imdb rating of ' +
        imdbArray[0].Value.replace('/', ' out of ');
    }
  } else if (source === 'rt') {
    if (rtArray.length > 0) {
      ratingStr = ratingStr = 'a Rotten Tomatoes rating of ' +
        rtArray[0].Value;
    }
  } else {
    if (imdbArray.length > 0 && rtArray.length > 0) {
      ratingStr = ratingStr = 'an imdb rating of ' +
        imdbArray[0].Value.replace('/', ' out of ') +
        ' and a Rotten Tomatoes rating of ' + rtArray[0].Value;
    } else if (imdbArray.length > 0) {
      ratingStr = ratingStr = 'an imdb rating of ' +
        imdbArray[0].Value.replace('/', ' out of ');
    } else if (rtArray.length > 0) {
      ratingStr = ratingStr = 'a Rotten Tomatoes rating of ' +
        rtArray[0].Value;
    } else {
      // Nothing to do
    }
  }
  return ratingStr;
};

const isValid = (str) => {
  return str && (str !== 'N/A');
};
