logger.info('Registering ClickableTitleDirective');

angular.module('app').directive('ClickableTitle', 
  function () {
    
    var clickableTitleController = function ($scope, $element) {
      $element.bind('click', function () {
        console.log('Turn up the volume.');
      });
    };

    return {
      controller: clickableTitleController,
      replace: true,
      restrict: 'EA',
      scope: {},
      template: '<h1 ng-transclude></h1>',
      transclude: true
    };
  }
);