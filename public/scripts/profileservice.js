angular.module('motoApp')
    .factory('profileservice', function($http){

  var profile = this;
  profile.user = {name: ""};

    this.loggedin = function(){
      return $http.get('/profile/moto.users').then(function(response) {
        profile.user.name = response.data.name;
        return response.data;
      },function(error){
        return false;
      }
    );
    };
    return this;
});
