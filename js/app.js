var initialised = false,
    latOffset = 20.585765,
    longOffset = -153.305191;

$(document).ready(function(){
    init();
})

function init() {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
          zoom : 17
    });

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

function setUserLocation(pos) {
    modLat = pos.coords.latitude + latOffset;
    modLong = pos.coords.longitude + longOffset;
    // marker for userLocation
    userLocation = new google.maps.Marker({
           map : map,
           position : new google.maps.LatLng(modLat, modLong)
	});

    // move map to userLocation
    map.panTo(new google.maps.LatLng(modLat, modLong));
    initialised = true;
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
     console.log("modLat: "+modLat);
     console.log("modLong: "+modLong);
}

function error(error) {
    // current position not found
    alert("The current position not found");
    console.log(error);
}