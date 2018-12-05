function convertCurrency(){
    var source = document.getElementById("source").value;
    var destination = document.getElementById("destination").value;
    var xmlreq = new XMLHttpRequest();
    var url = "https://api.exchangeratesapi.io/latest?symbols=" + source + "," + destination;
    xmlreq.open("GET",url,true);
    xmlreq.send();

    xmlreq.onreadystatechange = function () {
        if (xmlreq.readyState == 4    &&    xmlreq.status == 200) {
            var result = xmlreq.responseText;
            var jsResult = JSON.parse(result);
            var oneUnit = jsResult.rates[destination] / jsResult.rates[source];
            var amt = document.getElementById("source-text").value;
            $("#destination-text").html("Converted Amount is <br> <h1>"+(oneUnit * amt).toFixed(2)+"</h1>");
        }
    }
}
