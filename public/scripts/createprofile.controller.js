angular.module('motoApp')
.controller('CreateprofileController', CreateprofileController);

function CreateprofileController($http, $location) {
  console.log('CreateprofileController loaded');
  var ctrl = this;

  ctrl.createprofile = function() {
    console.log('creating new user profile');
    $http.post('/createprofile', {
      name: ctrl.name,
      motorcycle: ctrl.motorcycle,
      comment: ctrl.comment,
      userimg: ctrl.userimg
    }).then(function(){
      $location.path('/profile');
    }, function(error) {
      console.log('error registering', error);
    });
  };

}
