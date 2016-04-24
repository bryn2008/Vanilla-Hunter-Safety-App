var latAlaska = 71.2999;
var lngAlaska = -156.801;

var latFirst = null;
var lonFirst = null;


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

    if (( latFirst == null ) && ( lonFirst == null )) {
        console.log("first run");
        latFirst = pos.coords.latitude;
        lonFirst = pos.coords.longitude;
    }

    var modLat = latAlaska + (pos.coords.latitude - latFirst);
    var modLong = lngAlaska + (lonFirst - pos.coords.longitude);

    // marker for userLocation
    userLocation = new google.maps.Marker({
           map : map,
           position : new google.maps.LatLng(modLat, modLong)
    });

    var positionTimer = navigator.geolocation.watchPosition(function(position) {
        console.log("updating "+modLat+' '+modLong);
        $("#debug h2").replaceWith( "<h2>"+modLat+" "+modLong+"</h2>" );
        setMarkerPosition(userLocation, modLat, modLong);
        map.panTo(new google.maps.LatLng(modLat, modLong));
    });
    
}

function setMarkerPosition(marker, modLat, modLong) {
    marker.setPosition(new google.maps.LatLng(modLat, modLong));
    var currentPosition = new google.maps.LatLng(modLat, modLong);
    var result =
        google.maps.geometry.poly.containsLocation(currentPosition, dangerOne) ?
        alertRaised() :
        alertCancelled();

    // console.log(result);
}

function alertRaised(){
    // alert("ALERT!");
    // alert stuff
    $('#alert').show();
}

function alertCancelled(){
    console.log("Alert cancelled");
    // cancel alert stuff
    $('#alert').hide();
}

function error(error) {
    // current position not found
    alert("The current position not found");
    console.log(error);
}