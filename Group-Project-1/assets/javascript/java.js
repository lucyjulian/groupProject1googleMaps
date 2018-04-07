// Initialize Firebase
var config = {
    apiKey: "AIzaSyBwzLeSQNeYrlw1S_y1_GxjSNiBV1Jtz0Q",
    authDomain: "whatever-you-like-68e6e.firebaseapp.com",
    databaseURL: "https://whatever-you-like-68e6e.firebaseio.com",
    projectId: "whatever-you-like-68e6e",
    storageBucket: "whatever-you-like-68e6e.appspot.com",
    messagingSenderId: "161490624988"
};
firebase.initializeApp(config);
var database = firebase.database();

//google API info
googleAPIKey = "AIzaSyBH6YXtKRN9qmmi7CGTBh3Mw7Ae5Lb3kfQ";

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
        database.ref().set({
            lat: latitude,
            long: longitude,
            plcId: placeID,
        });
    });
})


//get geo coordinates from database and put into accessible variables

var lati;
var longi;
var cityPlaceId;
  
database.ref().on("value", function(snapshot) {

    if (snapshot.child("lat").exists() && snapshot.child("long").exists() && snapshot.child("plcId").exists()) {
  
      // Set the variables for geo info equal to the stored values in firebase.
      lati = snapshot.val().lat;
      longi = snapshot.val().long;
      cityPlaceId = snapshot.val().plcId;
  
      // Print the data to the console.
      console.log(lati);
      console.log(longi);
      console.log(cityPlaceId);
  
    };
    


});

mapURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+ lati + "," + longi + "&radius=500&types=food&key=AIzaSyBH6YXtKRN9qmmi7CGTBh3Mw7Ae5Lb3kfQ";
$.ajax({
    url: mapURL,
    method: "GET"
}).then(function(){
    {
        var uluru = {lat: -25.363, lng: 131.044};
      
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
      
      };
});

