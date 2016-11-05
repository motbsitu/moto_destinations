angular.module('motoApp')
    .controller('SearchController', SearchController);

function SearchController($http, $location, geolocation, gservice) {
    var ctrl = this;
    var destArray = [];

    ctrl.motodestinations = function() {
        $http.get('/search/moto.destination')
        .then(function(response) {
            //put it on controller to make avail in html
            ctrl.destArray = response.data;
        }, function(error) {});
    };
    ctrl.motodestinations();
    }
