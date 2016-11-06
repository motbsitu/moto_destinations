// Creates the gservice factory. This will be the primary means by which we interact with Google Maps
angular.module('gservice', [])
    .factory('gservice', function($http, $rootScope){

        // Initialize Variables
        // -------------------------------------------------------------
        // Service our factory will return
        var googleMapService = {};

        // Array of locations obtained from API calls
        var locations = [];

        // Selected Location (initialize to center of America)
        var selectedLat = 39.50;
        var selectedLong = -98.35;

        // Functions
        // --------------------------------------------------------------
        // Refresh the Map with new data. Function will take new latitude and longitude coordinates.
        googleMapService.refresh = function(latitude, longitude){
            // Set the selected lat and long equal to the ones provided on the refresh() call
            selectedLat = parseInt(latitude);
            selectedLong = parseInt(longitude);
            $http.get('/').success(function(response){
                // Then initialize the map.
                initialize(latitude, longitude);
            }).error(function(){});
        };


    //     // --------------------------------------------------------------
    //     // Convert a JSON of users into map points
    //     var convertToMapPoints = function(response){
    //
    //         // Clear the locations holder
    //         var locations = [];
    //
    //         // Loop through all of the JSON entries provided in the response
    //         for(var i= 0; i < response.length; i++) {
    //             var destination = response[i];
    //             console.log('destination', destination);
    //             // Create popup windows for each record
    //             var  contentString =
    //                 '<p><b>Name</b>: ' + destination.destName +
    //                 '<br><b>Comment</b>: ' + destination.destComment +
    //                 '</p>';
    //
    //             // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).
    //             locations.push({
    //                 latlon: new google.maps.LatLng(destination.location[1], destination.location[0]),
    //                 message: new google.maps.InfoWindow({
    //                     content: contentString,
    //                     maxWidth: 320
    //                 }),
    //                 destName: destination.destName,
    //                 destComment: destination.destComment
    //         });
    //     }
    // //     // location is now an array populated with records in Google Maps format
    // //     return locations;
    // };

// Initializes the map on checkin
var initialize = function(latitude, longitude) {
    // Uses the selected lat, long as starting point
    var myLatLng = {lat: selectedLat, lng: selectedLong};
    // If map has not been created already...
    if (!map){
        // look for the map container
        var container = document.getElementById('maphere')
        // // if we can't find one, don't try to load the map
        if (!container) {
          return;
        }
        // Create a new map and place in the checkin.html page
        var map = new google.maps.Map(container, {
            center: myLatLng,
            zoom: 8
        });
    }
    // Set initial location as a red marker
    var initialLocation = new google.maps.LatLng(latitude, longitude);

    var marker = new google.maps.Marker({
        position: initialLocation,
        map: map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });
    lastMarker = marker;

};
googleMapService.refreshSearch = function(latitude, longitude){
    // Clears the holding array of locations
    locations = [];
    // Set the selected lat and long equal to the ones provided on the refresh() call
    selectedLat = parseInt(latitude);
    selectedLong = parseInt(longitude);
//    console.log('selected lat', selectedLat);
    // // Perform an AJAX call to get all of the records in the db.
    $http.get('/moto.destination').success(function(response){
        // Convert the results into Google Map Format
      //  locations = convertToMapPoints(response);

        // Then initialize the map.
        initializeSearch(latitude, longitude);
    }).error(function(){});
};

// Initializes the map on search
var initializeSearch = function(latitude, longitude) {
    // Uses the selected lat, long as starting point
    var myLatLng = {lat: selectedLat, lng: selectedLong};
      // If map has not been created already...
    if (!map2){
        // look for the map container
        var container = document.getElementById('mapsearch')
        // // if we can't find one, don't try to load the map
        if (!container) {
          return;
        }
        // Create a new map and place in the search.html page
        var map2 = new google.maps.Map(container, {
            center: myLatLng,
            zoom: 8
        });

    }
    // Loop through each location in the array and place a marker
    // locations.forEach(function(n, i){
    //     var marker = new google.maps.Marker({
    //         position: n.latlon,
    //         map: map,
    //         title: "Big Map",
    //         icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    //     });
    //
    //     // For each marker created, add a listener that checks for clicks
    //     google.maps.event.addListener(marker, 'click', function(e){
    //
    //         // When clicked, open the selected marker's message
    //         currentSelectedMarker = n;
    //         n.message.open(map, marker);
    //     });
    // });

    // Set initial location as a red marker
    var initialLocation = new google.maps.LatLng(latitude, longitude);

    var marker = new google.maps.Marker({
        position: initialLocation,
        map: map2,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
    });
    lastMarker = marker;

};
return googleMapService;
});
