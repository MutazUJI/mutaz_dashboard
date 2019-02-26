
	var OpenWeatherKey = 'b975cc9f4ba510724c9bdb7d7f317657';
	var OpenWeatherURL = 'https://api.openweathermap.org/data/2.5/find?'
	var stations = []

	// Get the data
	function getWeatherStations(lat, lon){
		stations = []
        var url = OpenWeatherURL + 'lat=' + lat + '&lon=' + lon + '&appid=' + OpenWeatherKey + '&cnt=30&units=metric';
        console.log(url);   
        // Add more station to the list
        $.getJSON(url, function(data){
            console.log(data.list.coord);
			// stations = data;
			var stationList = data.list
			$.each(stationList, function(index, station){
				var name = station.name;
				var longitude = station.coord.lon; 
				var latitude = station.coord.lat;
				var temperature = station.main.temp;
				//creating dictionary inside the empty array stations
				stations.push(
					{
						'name': name,
						'longitude': longitude,
						'latitude': latitude,
						'temperature': temperature
					}
				)
			})
			// console.log(stations)
			// console.log(stations)
			stationMarkers = new L.markerClusterGroup();
			//this means that for each station on stations array do this loop
			$.each(stations, function(stationId, station){
				var popUpMessage = '<b>' + station.name + '</b>'
				popUpMessage += '<p>Temp: ' + station.temperature + '</p>'
				var marker = new L.marker([station.latitude, station.longitude]).bindPopup(popUpMessage);
				stationMarkers.addLayer(marker)
			})
			stationMarkers.addTo(map);
        });

		var marker1= new L.marker([lat, lon],{
    color: 'red'}).addTo(map);
	};
	//this map fit all the world if you want after getting postion it will be zoom to you location
	//var map = L.map('map').fitWorld();
	var map = L.map('map');

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(map);

	function onLocationFound(e) {
		//console.log(e.latlng)
		getWeatherStations(e.latlng.lat, e.latlng.lng);

	}

	function onLocationError(e) {
		alert(e.message);
	}

	map.on('locationfound', onLocationFound);
	map.on('locationerror', onLocationError);

	map.locate({setView: true, maxZoom: 12, zoom:10});

