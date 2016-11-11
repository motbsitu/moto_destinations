// routing
angular.module('motoApp').config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/about', {
    templateUrl: 'views/about.html',

  }).when('/register', {
    templateUrl: 'views/register.html',
    controller: 'RegisterController as register',
  }).when('/createprofile', {
    templateUrl: 'views/createprofile.html',
    controller: 'CreateprofileController as createprofile'
  }).when('/checkin', {
    templateUrl: 'views/checkin.html',
    controller: 'CheckinController as checkin'
  }).when('/profile', {
    templateUrl: 'views/profile.html',
    controller: 'ProfileController as profile'
  }).when('/search', {
    templateUrl: 'views/search.html',
    controller: 'SearchController as search'
  }).when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginController as login'
  }).otherwise({
    templateUrl: 'views/about.html',
    
  });
});
