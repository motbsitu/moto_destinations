angular.module('motoApp')
.controller('RegisterController', RegisterController);

function RegisterController($http, $location) {
  console.log('RegisterController loaded');
  var ctrl = this;

  ctrl.register = function() {
    console.log('registering new user');
    $http.post('/register', {
      email: ctrl.email,
      password: ctrl.password
    }).then(function(){
      console.log('what now?');
      $location.path('/createprofile');
    }, function(error) {
      console.log('error registering', error);
    });
  };
}
