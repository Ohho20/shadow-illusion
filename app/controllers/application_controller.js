var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var ApplicationController = new Controller();

ApplicationController.index = function() {
  this.active = "/";
  this.render();
}

module.exports = ApplicationController;