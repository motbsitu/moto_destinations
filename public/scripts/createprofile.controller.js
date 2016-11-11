angular.module('motoApp')
.controller('CreateprofileController', CreateprofileController);

function CreateprofileController($http, $location) {

  var ctrl = this;

  ctrl.createprofile = function() {
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
