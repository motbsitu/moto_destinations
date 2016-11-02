angular.module('motoApp')
.controller('LoginController', LoginController);

function LoginController($http, $location) {
  console.log('LoginController loaded');
  var ctrl = this;

  ctrl.login = function() {
    console.log('logging in');
    $http.post('/login', {
      email: ctrl.email,
      password: ctrl.password
    }).then(function(){
      $location.path('/about');
    }, function(error) {
      console.log('error loggin in', error);
    });
  };
}
