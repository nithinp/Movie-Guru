'use strict';

const movieService = require('../services/movie.service');

const getMovieDescription = function () {
  let movieName = getMovieName(this.event.request);
  if (movieName) {
    movieService.getMovieDescription(movieName)
      .then((data) => {
        this.response.speak(data);
        this.emit(':responseReady');
      })
      .catch((err) => {
        this.response.speak('Sorry, some error has occured please try again later.');
        this.emit(':responseReady');
      })
  } else {
    this.response.speak('Sorry, we can not identify the movie name. Please try again later');
    this.emit(':responseReady');
  }
};

const getMovieDirector = function () {
  let movieName = getMovieName(this.event.request);
  if (movieName) {
    movieService.getMovieDirector(movieName)
      .then((data) => {
        this.response.speak(data);
        this.emit(':responseReady');
      })
      .catch((err) => {
        this.response.speak('Sorry, some error has occured please try again later.');
        this.emit(':responseReady');
      })
  } else {
    this.response.speak('Sorry, we can not identify the movie name. Please try again later');
    this.emit(':responseReady');
  }
};

const getMovieRunTime = function () {
  let movieName = getMovieName(this.event.request);
  if (movieName) {
    movieService.getMovieRunTime(movieName)
      .then((data) => {
        this.response.speak(data);
        this.emit(':responseReady');
      })
      .catch((err) => {
        this.response.speak('Sorry, some error has occured please try again later.');
        this.emit(':responseReady');
      })
  } else {
    this.response.speak('Sorry, we can not identify the movie name. Please try again later');
    this.emit(':responseReady');
  }
};

const getMovieReleaseDate = function () {
  let movieName = getMovieName(this.event.request);
  if (movieName) {
    movieService.getMovieReleaseDate(movieName)
      .then((data) => {
        this.response.speak(data);
        this.emit(':responseReady');
      })
      .catch((err) => {
        this.response.speak('Sorry, some error has occured please try again later.');
        this.emit(':responseReady');
      })
  } else {
    this.response.speak('Sorry, we can not identify the movie name. Please try again later');
    this.emit(':responseReady');
  }
};

const getMoviePlot = function () {
  let movieName = getMovieName(this.event.request);
  if (movieName) {
    movieService.getMoviePlot(movieName)
      .then((data) => {
        this.response.speak(data);
        this.emit(':responseReady');
      })
      .catch((err) => {
        this.response.speak('Sorry, some error has occured please try again later.');
        this.emit(':responseReady');
      })
  } else {
    this.response.speak('Sorry, we can not identify the movie name. Please try again later');
    this.emit(':responseReady');
  }
};

const getMovieRating = function () {
  let movieName = getMovieName(this.event.request);
  if (movieName) {
    movieService.getMovieRating(movieName)
      .then((data) => {
        this.response.speak(data);
        this.emit(':responseReady');
      })
      .catch((err) => {
        this.response.speak('Sorry, some error has occured please try again later.');
        this.emit(':responseReady');
      })
  } else {
    this.response.speak('Sorry, we can not identify the movie name. Please try again later');
    this.emit(':responseReady');
  }
};

const getMovieCast = function () {
  let movieName = getMovieName(this.event.request);
  if (movieName) {
    movieService.getMovieCast(movieName)
      .then((data) => {
        this.response.speak(data);
        this.emit(':responseReady');
      })
      .catch((err) => {
        this.response.speak('Sorry, some error has occured please try again later.');
        this.emit(':responseReady');
      })
  } else {
    this.response.speak('Sorry, we can not identify the movie name. Please try again later');
    this.emit(':responseReady');
  }
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

// Helper functions

const getMovieName = (request) => {
  if (request.intent.slots && request.intent.slots.movieName &&
    request.intent.slots.movieName.value) {
    return request.intent.slots.movieName.value;
  } else {
    return '';
  }
};
