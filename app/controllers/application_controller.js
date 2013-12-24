var walkdir = require('walkdir'), 
  path = require('path'),
  locomotive = require('locomotive'),
  Controller = locomotive.Controller,
  mongoose = require('mongoose'),
  Q = require('q');

var ApplicationController = new Controller();

ApplicationController.index = function() {
  var controller = this;
  this.env = locomotive.express.settings.env;

  var applicationScripts = [];
  var templateScripts = [];

  Q.fcall(function() {
    var deferred = Q.defer();
      emitter = walkdir.walk('client/src');

    emitter.on('file', function (file, stat) {
      if (path.extname(file) === '.js') {
        applicationScripts.push(file.substring([process.cwd(), 'client/'].join('/').length));
      }
    });

    emitter.on('end', function () {
      deferred.resolve();
    });

    return deferred.promise;
  })
  .then(function() {
    var deferred = Q.defer();
    var emitter = walkdir.walk('client/dist/assets/templates');

    emitter.on('file', function (file, stat) {
      if (path.extname(file) === '.js') {
        templateScripts.push(file.substring([process.cwd(), 'client/dist/'].join('/').length));
      }
    });

    emitter.on('end', function () {
      deferred.resolve();
    });

    return deferred.promise;
  })
  .then(function() {
    controller.render({
      applicationScripts : applicationScripts,
      templateScripts : templateScripts 
    });
  });



};

module.exports = ApplicationController;
