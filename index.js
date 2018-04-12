/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';
const Alexa = require('alexa-sdk');
const movieController = require('./app/controllers/movie.controller');

const APP_ID = undefined;

const SKILL_NAME = 'Movie Guru';
const HELP_MESSAGE = 'You can ask me anything about movies, ' +
    'for example, ask movie guru to give me a description about ' +
    'interstellar, Or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const handlers = {
    LaunchRequest: function () {
        this.response.speak('Hi, Welcome to Movie Guru. You can ask me anything about movies, ' +
            'for example, ask movie guru to give me a description about ' +
            'interstellar.');
        this.emit(':responseReady');
    },
    movieDescriptionIntent: function () {
        movieController.getMovieDescription.call(this);
    },
    directorIntent: function () {
        movieController.getMovieDirector.call(this);
    },
    runningTimeIntent: function () {
        movieController.getMovieRunTime.call(this);
    },
    releaseDateIntent: function () {
        movieController.getMovieReleaseDate.call(this);
    },
    moviePlotIntent: function () {
        movieController.getMoviePlot.call(this);
    },
    movieRatingIntent: function () {
        movieController.getMovieRating.call(this);
    },
    movieCastIntent: function () {
        movieController.getMovieCast.call(this);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};