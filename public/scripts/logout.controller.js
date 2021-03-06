angular.module('motoApp')
.controller('LogoutController', LogoutController);

function LogoutController($http, $location, profileservice) {
  var ctrl = this;

  ctrl.logout = function() {

    $http.get('/logout')
    .then(function(){
      profileservice.user.name = "";
      $location.path('/login');
    }, function(error) {
      console.log('error logging out', error);
    });
  };
}
