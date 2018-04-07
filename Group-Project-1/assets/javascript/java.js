var config = {
    apiKey: "AIzaSyBwzLeSQNeYrlw1S_y1_GxjSNiBV1Jtz0Q",
    authDomain: "whatever-you-like-68e6e.firebaseapp.com",
    databaseURL: "https://whatever-you-like-68e6e.firebaseio.com",
    projectId: "whatever-you-like-68e6e",
    storageBucket: "whatever-you-like-68e6e.appspot.com",
    messagingSenderId: "161490624988"
};
firebase.initializeApp(config);
var lati;
var longi;
  
// Create a variable to reference the database.
var database = firebase.database();

googleAPIKey = "AIzaSyBH6YXtKRN9qmmi7CGTBh3Mw7Ae5Lb3kfQ";
searchTerm = "Sacramento";
geocodeURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + searchTerm + "&key=" + googleAPIKey;

$.ajax({
    url: geocodeURL,
    method: "GET"
}).then(function(response) {
    console.log(response.results[0].place_id);
    placeID = response.results[0].place_id;
    console.log(response.results[0].geometry.location);
    latitude = response.results[0].geometry.location.lat;
    longitude = response.results[0].geometry.location.lng;
    database.ref().set({
        lat: latitude,
        long: longitude,
        plcId: placeID,
    });
});

database.ref().on("value", function(snapshot) {

    // If Firebase has a highPrice and highBidder stored (first case)
    if (snapshot.child("lat").exists() && snapshot.child("long").exists() && snapshot.child("plcId").exists()) {
  
      // Set the variables for highBidder/highPrice equal to the stored values in firebase.
      lati = snapshot.val().lat;
      longi = snapshot.val().long;
      placeId = snapshot.val().plcId;
  
      // Print the data to the console.
      console.log(lati);
      console.log(longi);
      console.log(placeId);
  
    };
});

var map;
var infowindow;

function initMap() {
    var pyrmont = {lat: -33.867, lng: 151.195};

    map = new google.maps.Map($('#map'), {
        center: pyrmont,
        zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: pyrmont,
        radius: 500,
        type: ['store']
    }, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
        }
    }
}

function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}
var googleURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBH6YXtKRN9qmmi7CGTBh3Mw7Ae5Lb3kfQ&libraries=places";

$.ajax({
    url: googleURL,
    method: "GET"
})

// function initMap() {
//     var uluru = {lat: lati, lng: longi};
//     var options = {
//         zoom: 8,
//         center: {lat: lati, lng: longi}
//     }
//     var map = new google.maps.Map(document.getElementById('mapGoesHere'), options);

//     var marker = new google.maps.Marker({
//       position: uluru,
//       map: map
//     });
//     console.log(uluru);
// }


// $.ajax({
//     url: "https://maps.googleapis.com/maps/api/js?key=" + googleAPIKey + "&callback=initMap",});



// queryURL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + searchTerm + "&types=(cities)&language=en_US&key=" + googleAPIKey;

