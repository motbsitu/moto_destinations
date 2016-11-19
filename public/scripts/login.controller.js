angular.module('motoApp')
.controller('LoginController', LoginController);

function LoginController($http, $location) {
  var ctrl = this;

  ctrl.login = function() {
    $http.post('/login', {
      email: ctrl.email,
      password: ctrl.password
    }).then(function(){
      $location.path('/profile');
    }, function(error) {
        alert("Password or username are incorrect, or you are not registered");
    });
  };

}
