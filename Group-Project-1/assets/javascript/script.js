$("#map").html("future map of your future home? make a search!")

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAP9hQiHyzNUWYxVJfdoWCjpBlNnSBnxkc",
    authDomain: "resetmyresidence.firebaseapp.com",
    databaseURL: "https://resetmyresidence.firebaseio.com",
    projectId: "resetmyresidence",
    storageBucket: "",
    messagingSenderId: "366001195933"
};
firebase.initializeApp(config);
  
var database = firebase.database();
  
var latilongi= {lat: 35.7795897, lng: -78.6381787};
  
//google API info
var googleAPIKey = "AIzaSyBH6YXtKRN9qmmi7CGTBh3Mw7Ae5Lb3kfQ";
  
//search Button - get geocoordinates and put into database
$(document).on("click", "#searchBtn", function(){
    searchTerm = $("#citySearch").val();
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
        latilongi = response.results[0].geometry.location;
        console.log(latilongi);
        database.ref().set({
            lat: latitude,
            long: longitude,
            plcId: placeID,
            latlong: latilongi,
        });
        initMap();
    });
});
  
  
//get geo coordinates from database and put into accessible variables
  
var lati = 0;
var longi = 0;
var cityPlaceId;
var currentPOI;
console.log(lati);
    
database.ref().on("value", function(snapshot) {
  
    if (snapshot.child("lat").exists() && snapshot.child("long").exists() && snapshot.child("plcId").exists()) {
    
        // Set the variables for geo info equal to the stored values in firebase.
        lati = snapshot.val().lat;
        longi = snapshot.val().long;
        cityPlaceId = snapshot.val().plcId;
        placeOfInterest = snapshot.val().currentPOI;
        latilongi = snapshot.val().latlong;
    
        // Print the data to the console.
        console.log(lati);
        console.log(longi);
        console.log(cityPlaceId);
        console.log(currentPOI);
  
        console.log(lati);
  
  
  
        
    
        console.log(latilongi);
      
  
        
    };
});
  
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
//var latilongi = {lat: lati, lng: longi};
  
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: latilongi,
        zoom: 15
    });
  
    var infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
  
    service.getDetails({
        placeId: toString(cityPlaceId)
    }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                  'Place ID: ' + place.place_id + '<br>' +
                  place.formatted_address + '</div>');
                infowindow.open(map, this);
                database.ref().set({
                  currentPOI: place.name
                });
            });
        };
    });
};
  
