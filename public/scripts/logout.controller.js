angular.module('motoApp')
.controller('LogoutController', LogoutController);

function LogoutController($http, $location) {
  console.log('LogoutController loaded');
  var ctrl = this;

  ctrl.logout = function() {

    $http.get('/logout')
    .then(function(){
      $location.path('/login');
    }, function(error) {
      console.log('error logging out', error);
    });
  };
}
