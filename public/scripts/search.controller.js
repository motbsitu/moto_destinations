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

    ctrl.motodestinations = function() {
        $http.get('/search/moto.destination')
        .then(function(response) {
            //put it on controller to make avail in html
            ctrl.destArray = response.data;
        }, function(error) {});
    };
    ctrl.motodestinations();

    //mapping current location
        geolocation.getLocation().then(function(data){
            // Set the latitude and longitude equal to the HTML5 coordinates
            coords = {lat:data.coords.latitude, long:data.coords.longitude};
            // coords to number
            ctrl.formData.longitude = parseFloat(coords.long).toFixed(3);
            ctrl.formData.latitude = parseFloat(coords.lat).toFixed(3);

            gservice.refreshSearch(ctrl.formData.latitude, ctrl.formData.longitude);
        });

}
