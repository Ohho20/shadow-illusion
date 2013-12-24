(function () {
  'use strict';

  var logger = window.debug;

  logger.debug("Registering pagenav.directives");

  angular.module('navigation.pagenav.directives', [])

    .directive('rezrPagenav',[
      function () {
        return {
          replace: true,
          restrict: 'A',
          scope: {
            items: "="
          },
          templateUrl: 'assets/templates/navigation/pagenav/pagenav.html'
        };
      }]
    )

    .directive('rezrPagenavItem',
      function () {
        return {
          replace: false,
          transclude: true,
          restrict: 'A',
          controller : 'PagenavItemController',
          scope: {
            item: "="
          },
          template: '<a ng-transclude></a>'
        };
      }
    );

}());
