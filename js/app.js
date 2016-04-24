// var latOffset = 20.585765,
//     longOffset = -153.305191;

// torquay testing

// outside
// var latOffset = 20.825;
// var longOffset = -153.305;

// inside
var latOffset = 20.825,
    longOffset = -153.300;



// Define the LatLng coordinates for the polygon's path.

  var dangerOneCoords = [
        {lat: 71.300, lng: -156.800},
        {lat: 71.297, lng: -156.789},
        {lat: 71.293, lng: -156.794},
        {lat: 71.291, lng: -156.812},
        {lat: 71.296, lng: -156.831},
        {lat: 71.298, lng: -156.815},
        {lat: 71.300, lng: -156.800}
  ];

  // Construct the polygon.
  var dangerOne = new google.maps.Polygon({
    paths: dangerOneCoords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });


$(document).ready(function(){
    init();
})

function init() {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
          zoom : 10
    });

  dangerOne.setMap(map);

    if (navigator.geolocation) {// if we have geolocation
        navigator.geolocation.getCurrentPosition(watchCurrentPosition, error, {
            enableHighAccuracy : true,
            timeout : 60000, // give up after 6 seconds
            maximumAge : 0
        });
    } else { // sad face
        alert("Your phone does not support the Geolocation API");
    }
}

function watchCurrentPosition(pos) {
    modLat = pos.coords.latitude + latOffset;
    modLong = pos.coords.longitude + longOffset;
    // marker for userLocation
    userLocation = new google.maps.Marker({
           map : map,
           position : new google.maps.LatLng(modLat, modLong)
    });

    var positionTimer = navigator.geolocation.watchPosition(function(position) {
        setMarkerPosition(userLocation, modLat, modLong);
        map.panTo(new google.maps.LatLng(modLat, modLong));
    });
    
}

function setMarkerPosition(marker, modLat, modLong) {
    marker.setPosition(new google.maps.LatLng(modLat, modLong));
    var currentPosition = new google.maps.LatLng(modLat, modLong);
    var result =
        google.maps.geometry.poly.containsLocation(currentPosition, dangerOne) ?
        'inside' :
        'outside';

    console.log(result);
}

function error(error) {
    // current position not found
    alert("The current position not found");
    console.log(error);
}