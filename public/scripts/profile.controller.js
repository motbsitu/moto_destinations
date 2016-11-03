angular.module('motoApp')
    .controller('ProfileController', ProfileController);

function ProfileController($http, $location) {
    var controller = this;

    controller.motouser = function() {
        $http.get('/profile/moto.users').then(function(response) {
            //put it on controller to make avail in html
            controller.userprofile = response.data;
        }, function(error) {
          $location.path('/login');
        });
    };
    controller.motouserupdate = function() {

        $http.put('/profile/' + controller.userprofile._id,
        {comment: controller.userprofile.comment, name: controller.userprofile.name, motorcycle: controller.userprofile.motorcycle, email: controller.userprofile.email})
        .then(function(response) {
            controller.userprofile = response.data;
        }, function(error) {});
    };
  controller.motouser();

}
