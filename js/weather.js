$('#get_weather').click(function(){
    var location = document.getElementById("search-location").value;
    getWeather(location);
});

function getWeather(location) {
    $.get('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+location+'%2C%20%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function (data) {
        $("#weather-today").show()
        if (data.query.results === null) {
            $("#weather-today").html("Location not found: " + location + "!");
        } else {
            $("#weather-data").show()
        	for(i=0; i < 10; i++)
			{
				if(i===0){
                    $(".location").eq([i]).html("Location: <b>"+ data.query.results.channel.location.city + ", " +  data.query.results.channel.location.country +"</b>")
                    $(".date").eq([i]).html("Date: <b>"+ data.query.results.channel.item.forecast[i].date +" (Today)</b>");
                    $(".mintemprature").eq([i]).html("Min. Temprature: <b>"+ data.query.results.channel.item.forecast[i].low + String.fromCharCode(176)+"F [" + Math.round(5/9*(data.query.results.channel.item.forecast[i].low-32)* 100) / 100  + String.fromCharCode(176)+"C]</b>");
                    $(".maxtemprature").eq([i]).html("Max. Temprature: <b>"+ data.query.results.channel.item.forecast[i].high + String.fromCharCode(176)+"F [" + Math.round(5/9*(data.query.results.channel.item.forecast[i].high-32)* 100) / 100 + String.fromCharCode(176)+"C]</b>");
                    $(".wind").eq([i]).html("Wind Speed: <b>"+ data.query.results.channel.wind.speed + " " +data.query.results.channel.units.speed+"</b>");
                    $(".pressure").eq([i]).html("Pressure: <b>"+ data.query.results.channel.atmosphere.pressure   + " " +data.query.results.channel.units.pressure +"</b>");
                    $(".humidity").eq([i]).html("Humidity: <b>"+ data.query.results.channel.atmosphere.humidity +"</b>");
    				$(".cloud").eq([i]).html("Cloud: <b>"+ data.query.results.channel.item.forecast[i].text +"</b>");
                } else {
                    $(".date").eq([i]).html(data.query.results.channel.item.forecast[i].date);
                    $(".mintemprature").eq([i]).html(data.query.results.channel.item.forecast[i].low + String.fromCharCode(176)+"F [" + Math.round(5/9*(data.query.results.channel.item.forecast[i].low-32)* 100) / 100  + String.fromCharCode(176)+"C]");
                    $(".maxtemprature").eq([i]).html(data.query.results.channel.item.forecast[i].high + String.fromCharCode(176)+"F [" + Math.round(5/9*(data.query.results.channel.item.forecast[i].high-32)* 100) / 100 + String.fromCharCode(176)+"C]");
    				$(".cloud").eq([i]).html(data.query.results.channel.item.forecast[i].text);
                }
			}
        }
    });
}

var options = {
    types:['(cities)'],
    componentRestrictions: {country: 'us'}
}

var input1 = document.getElementById("search-location");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);
