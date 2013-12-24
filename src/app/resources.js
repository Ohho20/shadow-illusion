(function () {
  'use strict';

  var logger = window.debug;

  logger.debug("Registering api.resources");

  var resources = angular.module('app.resources', [])
    .factory('$control', [
      '$q',
      '$api',
      'authorization',
      function ($q, $api, authorization) {

        var control = {

          getAll : function (resource, query) {
              return $api[resource].query(query || {}).$promise;
          },

          get : function (resource, id) {
              return $api[resource].get({id: id}).$promise;
          },

          create : function (resource, model) {
              return new $api[resource](model).$save().$promise;
          }, 

          update : function (resource, model) {
            return $api[resource].update(model).$promise;
          }
        };

        return control;
      }
    ])

    .factory('$api', [
      '$resource',
      '$apiUrl',
      function ($resource, $apiUrl) {

        var api = {

          // administration
          vacationProperty : $resource($apiUrl + '/vacationProperty/:id', {
            id: '@id'
          }, {
            update : {
              method: 'PUT'
            }
          }),

          season : $resource($apiUrl + '/season', {
            id: '@id'
          }, {
            update : {
              method: 'PUT'
            }
          }),

          timeslot : $resource($apiUrl + '/timeslot', {
            id: '@id'
          }, {
            update : {
              method: 'PUT'
            }
          }),

          reservation : $resource($apiUrl + '/reservation', {
            id: '@id'
            }, {
              update : {
                method: 'PUT'
              }
            }),

          // rezr


          // security
          login : $resource($apiUrl + '/login', {}, {
            'login' : {
              method: 'POST',
              headers: {'X-Requested-With': 'XMLHttpRequest'}
            },
            'current' : {
              method: 'GET',
              headers: {'X-Requested-With': 'XMLHttpRequest'}
            }
          }),

          logout : $resource($apiUrl + '/logout', {}, {
            'logout' : {
              method: 'POST',
              headers: {'X-Requested-With': 'XMLHttpRequest'}
            }
          }),
          
          // ui 
          sidenav : $resource($apiUrl + '/ui/sidenav/items')

        };

        return api;
      }
    ]);
  
  resources.value('$apiUrl', '');

  logger.debug("Registered api.resources");

}());
