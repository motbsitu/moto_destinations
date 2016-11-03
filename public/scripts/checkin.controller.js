angular.module('motoApp')
    .controller('CheckinController', CheckinController);

function CheckinController($http, $location) {
    var ctrl = this;

    ctrl.userinfo = function() {
        $http.get('/checkin/moto.users').then(function(response) {
          console.log('response data in checkin', response.data);
            ctrl.userprofile = response.data;
        }, function(error) {
          $location.path('/login');
        });
    };

  ctrl.userinfo();

}
