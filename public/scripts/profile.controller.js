angular.module('motoApp')
    .controller('ProfileController', ProfileController);

function ProfileController($http, $location) {
    var controller = this;

    controller.motouser = function() {
        $http.get('/profile/moto.users').then(function(response) {
            console.log('profile controller response', response);
            //put it on controller to make avail in html
            controller.userprofile = response.data;
        }, function(error) {});
    };
    controller.motouserupdate = function() {
      console.log('controller.userprofile.comment', controller.userprofile );
        $http.put('/profile/' + controller.userprofile._id, {comment: controller.userprofile.comment })//, name: etc

        .then(function(response) {
            console.log('profile controller response', response);
            //put it on controller to make avail in html
            controller.userprofile = response.data;
        }, function(error) {});
    };
  controller.motouser();

}
