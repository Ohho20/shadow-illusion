angular.module('app.controllers', [])

  .controller('MainCtrl', function ($scope, securityContext){
    

  })
  
  .controller('AppCtrl', 
    function ($scope){
      
    }
  )

  .controller('NavCtrl', 
    function ($scope, authentication) {
    
      $scope.logout = function logout () {
        authentication.logout();
      };
    }
  );