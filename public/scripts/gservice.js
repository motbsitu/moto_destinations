// Creates the gservice factory. This is the primary means to interact with Google Maps
angular.module('gservice', [])
    .factory('gservice', function($http, $rootScope) {

        // Service our factory will return
        var googleMapService = {};

        // Array of locations obtained from API calls
        var locations = [];

        // Variables to pan to the right spot
        var lastMarker;
        var currentSelectedMarker;

        // Selected Location (initialize to center of America - not using currently)
        var selectedLat = 39.50;
        var selectedLong = -98.35;

        // Handling Clicks and location selection
        googleMapService.clickLat = 0;
        googleMapService.clickLong = 0;

        // Refresh the Map in checkin with new data. Function will take new latitude and longitude coordinates.
        googleMapService.refresh = function(latitude, longitude) {
            // Set the selected lat and long equal to the ones provided on the refresh() call
            selectedLat = parseFloat(latitude);
            selectedLong = parseFloat(longitude);
            $http.get('/').success(function(response) {
                // Then initialize the map.
                initialize(latitude, longitude);
            }).error(function() {});
        };


        // Convert a JSON of destinations into map points
        var convertToMapPoints = function(response) {
            // Clear the locations holder
            var locations = [];
            // Loop through all of the JSON entries provided in the response
            for (var i = 0; i < response.length; i++) {
                var destination = response[i];
                var lat = destination.location[1];
                var long = destination.location[0];
                var url = 'http://www.google.com/maps/dir/Current+Location/' + lat + ',' + long;

                // Create popup windows for each record
                var contentString =
                    '<p><b>Destination</b>: ' + destination.destName +
                    '<br><b>Comment</b>: ' + destination.destComment +
                    '<br><b>Recommended By:</b>: ' + destination.name +
                    '<br><b>Get Directions</b>: ' + '<a class="marker-link" href="' + url + '">Directions</a>' +
                    '</p>';

                // Converts each of the JSON records into Google Maps Location format (Note [Lat, Lng] format).
                locations.push({
                    latlon: new google.maps.LatLng(destination.location[1], destination.location[0]),
                    message: new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 320
                    }),
                    destName: destination.destName,
                    destComment: destination.destComment,
                    name: destination.name
                });
            }
            // location is now an array populated with records in Google Maps format
            return locations;
        };

        // Initializes the map on checkin page
        var initialize = function(latitude, longitude) {
            // Uses the selected lat, long as starting point
            var myLatLng = {
                lat: selectedLat,
                lng: selectedLong
            };
            // If map has not been created already...
            if (!map) {
                // look for the map container
                var container = document.getElementById('maphere')
                    // if we can't find one, don't try to load the map
                if (!container) {
                    return;
                }
                // Create a new map and place in the checkin.html page
                var map = new google.maps.Map(container, {
                    center: myLatLng,
                    zoom: 12,
                    zoomControl: true,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.SMALL
                    }
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
        googleMapService.refreshSearch = function(latitude, longitude, filteredResults) {
            // Clears the holding array of locations
            locations = [];
            // Set the selected lat and long equal to the ones provided on the refresh() call
            selectedLat = parseFloat(latitude);
            selectedLong = parseFloat(longitude);

            // Convert the results into Google Map Format
            locations = convertToMapPoints(filteredResults);

            // Then initialize the map.
            initializeSearch(selectedLat, selectedLong);
        };

        // Initializes the map on search page
        var initializeSearch = function(latitude, longitude) {
            // Uses the selected lat, long as starting point
            var myLatLng = {
                lat: latitude,
                lng: longitude
            };

            // If map has not been created already...
            if (!map2) {
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
            locations.forEach(function(n, i) {
                var marker = new google.maps.Marker({
                    position: n.latlon,
                    map: map2,
                    title: "Big Map",

                    icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                });

                // For each marker created, add a listener that checks for clicks
                google.maps.event.addListener(marker, 'click', function(e) {
                    // When clicked, open the selected marker's message
                    currentSelectedMarker = n;
                    n.message.open(map2, marker);
                });
            });

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
