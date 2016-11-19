angular.module('motoApp')
    .controller('CheckinController', CheckinController);

function CheckinController($http, $location, geolocation, gservice) {
    var ctrl = this;
    ctrl.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;

    ctrl.formData.latitude = 39.500;
    ctrl.formData.longitude = -98.350;

//get user name to display and userID to use
  ctrl.userinfo = function() {
      $http.get('/checkin/moto.users').then(function(response) {
        ctrl.userprofile = response.data;
      }, function(error) {
        $location.path('/login');
      });
  };
  ctrl.userinfo();

//mapping current location with geolocation
    geolocation.getLocation().then(function(data){
        // Set the latitude and longitude equal to the HTML5 coordinates
        coords = {lat:data.coords.latitude, long:data.coords.longitude};
        // coords to number
        ctrl.formData.longitude = parseFloat(coords.long).toFixed(3);
        ctrl.formData.latitude = parseFloat(coords.lat).toFixed(3);

        gservice.refresh(ctrl.formData.latitude, ctrl.formData.longitude);
    });



// Saves the destination data to the db
    ctrl.createdestination = function() {
      var body = {
      destName:  ctrl.destName,
      destComment: ctrl.destComment,
      location: [ctrl.formData.longitude, ctrl.formData.latitude]
    };
        $http.post('/checkin', body
      ).then(function(){
        $location.path('/profile');
      }, function(error) {
        console.log('error registering', error);
      });
    };
}
