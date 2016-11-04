angular.module('motoApp')
    .controller('CheckinController', CheckinController);

function CheckinController($http, $location, geolocation, gservice) {
    var ctrl = this;
    ctrl.formData = {};
    console.log(ctrl.formData);
    var coords = {};
    var lat = 0;
    var long = 0;

    ctrl.formData.latitude = 39.500;
    ctrl.formData.longitude = -98.350;

//get user name to display and userID to use
  ctrl.userinfo = function() {
      $http.get('/checkin/moto.users').then(function(response) {
        //console.log('response data in checkin', response.data);
          ctrl.userprofile = response.data;
      }, function(error) {
        $location.path('/login');
      });
  };
  ctrl.userinfo();

//mapping current location TRY
geolocation.getLocation().then(function(data){
    console.log('getlocation working');
        // Set the latitude and longitude equal to the HTML5 coordinates
        coords = {lat:data.coords.latitude, long:data.coords.longitude};
        console.log('coords', coords);
        // Display coordinates in location textboxes rounded to three decimal points
        // ctrl.formData.longitude = parseFloat(coords.long).toFixed(3);
        // ctrl.formData.latitude = parseFloat(coords.lat).toFixed(3);
        //
        // // Display message confirming that the coordinates verified.
        // ctrl.formData.htmlverified = "Yep (Thanks for giving us real data!)";

        gservice.refresh(ctrl.formData.latitude, ctrl.formData.longitude);

    });
}
