var markers = [];
//var parameters = '/28.6139,77.2090';
var parameters
var cliendId = 'c85ab82876d0ef90cf43d128797c91dc';
var endpoint = 'https://api.darksky.net/forecast/';
var list = document.getElementById('list');

function initMap() {
    var uluru = {lat: 28.6139, lng: 77.2090};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
    addMarker({coords:uluru});

    map.addListener('click', function(e) {
        placeMarker(e.latLng, map);
        parameters = "";
        parameters = '/'+ e.latLng.lat() + ',' + e.latLng.lng();
        console.log(parameters);
        getWeather(parameters);
    });
}
function addMarker(props)
{
    var marker = new google.maps.Marker({
        positon:props.coords,
        map:map
    });
    markers.push(marker);
    if(props.iconImg)
    {
        icon:props.iconImg;
    }
    getWeather('/28.6139,77.2090');
}
function placeMarker(latLng, map) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
    map.panTo(latLng);
    markers[0].setMap(null);
    markers =[];
    markers.push(marker);
    markers[0].setMap(map);
}



function getWeather(parameters)
{
    var Data = [];
    var url = endpoint + cliendId + parameters;
    function AjaxRequest(url,callback) {
        $.ajax({ url: url,dataType: 'jsonp', success: function(data) {
            callback(data)
        }})
    }
    AjaxRequest(url, function(d) {
        //Data.push(d.latitude);
        //Data.push(d.longitude);
        Data.push(d);
        console.log(Data);
        //console.log(Data[0].currently);
		currentSummary(Data[0].currently);
    });
	function  currentSummary(cs) {
		
		var current  =  "";
		list.innerHTML = "";
		current += '<li>Summary : '+cs.summary+'</li>'+'<li>Dew Point : '+cs.dewPoint+'</li>'+'<li>Humidity : '+cs.humidity+'</li>'+'<li>Wind Speed : '+cs.windSpeed+'</li>'+'<li>Cloud Cover : '+cs.cloudCover+'</li>'+'<li>Temperature : '+cs.temperature+'</li>'+'<li>UV Index : '+cs.uvIndex+'</li>';
		
		list.innerHTML = current;
	}
	/* var current  =  {
           time: cs.time,
           summary: cs.summary,
           icon: cs.icon,
           nearestStormDistance: cs.nearestStormDistance
       };
      console.log(current);
      summary.text(current.summary);*/
}









