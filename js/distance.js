
var map = new google.maps.Map(document.getElementById('map'));
map.setCenter({lat: 39.850033,lng: -98.6500523});
map.setZoom(4);
map.setMapTypeId(google.maps.MapTypeId.ROADMAP);

var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
directionsDisplay.setMap(map);

$('#get_distance').click(function(){
    var request = {
        origin: document.getElementById('distance-from').value,
        destination: document.getElementById('distance-to').value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.METRIC //IMPERIAL
    }

    directionsService.route(request,
    function(result,status){
        if(status == google.maps.DirectionsStatus.OK){
            $("#distance").html("From: <b>"+document.getElementById("distance-from").value+"</b><br/>To: <b>"+document.getElementById("distance-to").value+"</b><br/>Driving distance: <b>"+result.routes[0].legs[0].distance.text+"</b><br/>Duration: <b>" +result.routes[0].legs[0].duration.text+"</b>");
            directionsDisplay.setDirections(result);
        } else{
            directionsDisplay.setDirections({routes:[]});
            map.setCenter({lat: 39.850033,lng: -98.6500523});
            $("#distance").html("Could not retrive distance");
        }
    });
});

var options = {
    types:['(cities)'],
    componentRestrictions: {country: 'us'}
}

var input1 = document.getElementById("distance-from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("distance-to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
