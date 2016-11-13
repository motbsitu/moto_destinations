angular.module('motoApp')
    .controller('ProfileController', ProfileController);

function ProfileController($http, $location, profileservice) {
    var controller = this;
    var destArray = [];
    var idToDelete = "";
    controller.user = profileservice.user;

    controller.motouser = function() {
       profileservice.loggedin().then(function(response) {
            //put it on controller to make avail in html
            controller.userprofile = response;
        }, function(error) {
            $location.path('/login');
        });
    };
    controller.motouserupdate = function() {

        $http.put('/profile/' + controller.userprofile._id, {
                comment: controller.userprofile.comment,
                name: controller.userprofile.name,
                motorcycle: controller.userprofile.motorcycle,
                email: controller.userprofile.email
            })
            .then(function(response) {
                controller.userprofile = response.data;
            }, function(error) {});
    };
    controller.motouser();

    controller.motodestinations = function() {
        $http.get('/profile/moto.destination')
            .then(function(response) {
                //put it on controller to make avail in html
                controller.destArray = response.data;
                // console.log(controller.destArray);
            }, function(error) {});
    };
    controller.motodestinations();

//update destination name and comment
    controller.motodestinationupdate = function(index) {
      // console.log('controller.destArray', controller.destArray);
        $http.put('/profile/moto.destination/' + controller.destArray[index]._id, {
                name: controller.destArray[index].destName,
                comment: controller.destArray[index].destComment,
            })
            .then(function(response) {
                controller.motodestinations();
            }, function(error) {});
    };

//find id for delete
    controller.motodestinationsfindId = function(index){
      idToDelete = controller.destArray[index]._id
    };

// delete destination
    controller.motodestinationsdelete = function(){
      // console.log('button clicked');
        $http.delete('/profile/moto.destination/' + idToDelete)
          .then(function() {
              controller.motodestinations();
          }, function(error) {});
        };


}
