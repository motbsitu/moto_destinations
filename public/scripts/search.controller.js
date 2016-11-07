angular.module('motoApp')
    .controller('SearchController', SearchController);

function SearchController($http, $location, geolocation, gservice) {
    var ctrl = this;
    var destArray = [];
    ctrl.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;

    ctrl.formData.latitude = 39.500;
    ctrl.formData.longitude = -98.350;


    ctrl.motodestQuery = function() {

      queryBody = {
          longitude: parseFloat(ctrl.formData.longitude),
          latitude: parseFloat(ctrl.formData.latitude),
          distance: parseFloat(ctrl.formData.distance)
      };
      // $http.get('/search/moto.destination', longitude, latitude, distance)
        $http.get('/search/moto.destination?longitude='+ parseFloat(ctrl.formData.longitude) +
         '&latitude='+ parseFloat(ctrl.formData.latitude) + '&distance='+ parseFloat(ctrl.formData.distance))
          .success(function(queryResults){
            gservice.refreshSearch(queryBody.latitude, queryBody.longitude, queryResults);

          })
          .error(function(queryResults){
            console.log('error query', + queryResults);
          })
      };


    //mapping current location
        geolocation.getLocation().then(function(data){
            // Set the latitude and longitude equal to the HTML5 coordinates
            coords = {lat:data.coords.latitude, long:data.coords.longitude};
            console.log('browser thinks we are here', coords);
            // coords to number
            ctrl.formData.longitude = parseFloat(coords.long).toFixed(3);
            ctrl.formData.latitude = parseFloat(coords.lat).toFixed(3);

            gservice.refreshSearch(ctrl.formData.latitude, ctrl.formData.longitude, []);
        });




}
