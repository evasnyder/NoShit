var blueInfo;
var greenInfo;
//var first = false;
var savedGreen;
var savedBlue;

var app = (function()
{
	// Application object.
	var app = {};

	// Dictionary of beacons.
	var beacons = {};

	// Timer that displays list of beacons.
	var updateTimer = null;


	var beaconDistance;
	// blueInfo = 'Katie (USA)' + '<br />';
	// greenInfo = 'Eva (USA)' + '<br />';

	app.initialize = function()
	{
		document.addEventListener('deviceready', onDeviceReady, false);
		//displayBeaconList();
	};

	function onDeviceReady()
	{

		blueInfo = 'Katie (USA)' + '<br />';
		greenInfo = 'Eva (USA)' + '<br />';
		first = true;

		// Specify a shortcut for the location manager holding the iBeacon functions.
		window.estimote = EstimoteBeacons;

		// Start tracking beacons!
		startScan();

		//displayBeaconList();

		// Display refresh timer.
		updateTimer = setInterval(displayBeaconList, 500);
		//updateTimer = setInterval(updateDistance, 500);

	}
	// var displayed = {};
	// var displayCount = 0;
	// var didDisplay = false;

	function startScan()
	{
		//displayBeaconList();
		function onBeaconsRanged(beaconInfo)
		{
			//console.log('onBeaconsRanged: ' + JSON.stringify(beaconInfo))
			for (var i in beaconInfo.beacons)
			{
				// Insert beacon into table of found beacons.
				var beacon = beaconInfo.beacons[i];
				beacon.timeStamp = Date.now();
				var key = beacon.uuid + ':' + beacon.major + ':' + beacon.minor;
				beacons[key] = beacon;

				//displayBeaconList();
			// 	if (!displayed[key]){
			// 		displayCount ++;
			// 		displayed[key] = true;
			// 	}
			// }
			// if (!didDisplay && displayCount == 2){
			// 	displayBeaconList();
			// 	didDisplay = true;
			// }
			}	
		}

		function onError(errorMessage)
		{
			console.log('Ranging beacons did fail: ' + errorMessage);
		}

		// Request permission from user to access location info.
		// This is needed on iOS 8.
		estimote.requestAlwaysAuthorization();

		// Start ranging beacons.
		estimote.startRangingBeaconsInRegion(
			{}, // Empty region matches all beacons
			    // with the Estimote factory set UUID.
			onBeaconsRanged,
			onError);
	}

	function updateDistance() { 
		beaconDistance = distanceHTML(beacon);
		return beaconDistance;
	}

/*	function updateBlueTrashInfo(name, country) { 
		blueInfo = name + '('+ country + ')' + '<br />';
		window.location.href = "screen2.html";	
	}

	function updateGreenTrashInfo(text) { 
		//greenInfo = name + '('+ country + ')' + '<br />';
		//window.location.href = "screen2.html";
		//greenInfo = text;
		//displayBeaconList();	
		alert("update!!");
	}*/

	function displayBeaconList()
	{
		// // Clear beacon list.
		$('#found-beacons').empty();

		 var timeNow = Date.now();

		// //beaconDistance = distanceHTML(beacon);

		// // Update beacon list.
		 $.each(beacons, function(key, beacon)
		 {
		// 	// Only show beacons that are updated during the last 60 seconds.
		 	if (beacon.timeStamp + 20000 > timeNow)
		 	{
		// 		// Create tag to display beacon data.
		// 		var element = $(
		// 			'<li>'
		// 			+	trashcanName(beacon)
		// 			+	trashgoerName(beacon)
		// 			+	proximityHTML(beacon)
		// 			+	distanceHTML(beacon)
		// 			//+	beaconDistance
		// 			+	rssiHTML(beacon)
		// 			+ '</li>'
		// 		);
				
				if(beacon.major == 58219) { 						//DISPLAY THE BLUE BEACON
					// Create tag to display beacon data.
					//blueInfo = passedNameBLUE + ' ('+passedCountryBLUE+') <br />';
					savedBlue = blueInfo;
					var elementA = $(
						'<li>'
						+	'Daphne <br />'
						+	blueInfo 
						+	proximityHTML(beacon)
						+	distanceHTML(beacon)
						//+	beaconDistance
						+	rssiHTML(beacon)
						+ '</li>'
					);
				}

				if(beacon.major == 60417) { 						//DISPLAY THE GREEN BEACON
					// Create tag to display beacon data.
					//alert(greenInfo);
/*					if(first)
					{
						var elementB = $(
						'<li>'
						+	'Scooby <br />' 
						+	greenInfo
						+	proximityHTML(beacon)
						+	distanceHTML(beacon)
						//+	beaconDistance
						+	rssiHTML(beacon)
						+ '</li>'
					);
					}
					else
					{*/
						greenInfo = passedNameGREEN + ' ('+passedCountryGREEN+') <br />';
						savedGreen = greenInfo;
						var elementB = $(
						'<li>'
						+	'Scooby <br />' 
						+	greenInfo
						+	proximityHTML(beacon)
						+	distanceHTML(beacon)
						//+	beaconDistance
						+	rssiHTML(beacon)
						+ '</li>'
					);
					//}

				}

				$(elementA).append(makeButton(function ()			//ADDED A BUTTON TO THE BLUE BEACON
				{
					//testingtestingtestingtesting
					//alert("hey");
					window.location.href = "blueTrashcan.html";			//line of code that brings you to another window
				}));

				$(elementB).append(makeButton(function() 			//ADDED A BUTTON TO THE GREEN BEACON
				{ 
					//alert('hi');
					window.location.href = "greenTrashcan.html";			//line of code that brings you to another window
				}));

				$('#found-beacons').append(elementA);				//APPENEDED BOTH OF THOSE BUTTONS TO THEIR
				$('#found-beacons').append(elementB);				//RIGHTFUL OWNERS
			}
		});
	}

	/* 
Make a button!! But like, a SUPER cool button. 
*/
 	function makeButton(func) 
 	{
		var b =  $('<button />', {'class': 'superclose', text: 'Click Me!!'});
		//b.click(func);
		b.click(func)
		return b;
	}  

	// function trashcanName(beacon)
	// {
	// 	var random = Math.floor(Math.random()*4);

	// 	var tNames = [
	// 	'Scooby',
	// 	'Shaggy',
	// 	'Fred',
	// 	'Daphne',
	// 	'Velma'];

	// 	var str = 'Trashcan Name: ';
	// 	return str.bold() + tNames[random] + '<br />';
	// }

	// function trashgoerName(beacon)
	// {
	// 	var random = Math.floor(Math.random()*4);

	// 	var gNames = [
	// 	'Sam (DEU)',
	// 	'Jesse (FRA)',
	// 	'Eva (POL)',
	// 	'Katie (USA)',
	// 	'Terrance (UK)'];

	// 	var str = 'Trashgoer Name: ';
	// 	return str.bold() + gNames[random] + '<br />';
	// }

	function proximityHTML(beacon)
	{
		var proximity = beacon.proximity;
		if (!proximity) { return ''; }

		var proximityNames = [
			'Unknown',
			'YOU\'RE SO CLOSE!',
			'Almost!',
			'Not close enough yet!'];

		return 'Proximity: ' + proximityNames[proximity] + '<br />';
	}

	function distanceHTML(beacon)
	{
		var meters = beacon.distance;
		if (!meters) { return ''; }

		var distance =
			(meters > 1) ?
				(meters * 3.28).toFixed(3) + ' ft' :
				(meters * 100 * 0.39).toFixed(3) + ' in';

		if (meters < 0) { distance = '?'; }

		return 'Distance: ' + distance + '<br />'
	}

	function rssiHTML(beacon)
	{
		var beaconColors = [
			'rgb(214,212,34)', // unknown
			'rgb(215,228,177)', // mint
			'rgb(165,213,209)', // ice
			'rgb(45,39,86)', // blueberry
			'rgb(200,200,200)', // white
			'rgb(200,200,200)', // transparent
		];

		// Get color value.
		var color = beacon.color || 0;
		// Eliminate bad values (just in case).
		color = Math.max(0, color);
		color = Math.min(5, color);
		var rgb = beaconColors[color];

		/*FYI, RSSI is the strength of the beacon's signal as seen on the receiving 
		device, e.g. a smartphone. In general, the greater the distance between 
		the device and the beacon, the lesser the strength of the received signal.*/ 

		// Map the RSSI value to a width in percent for the indicator.
		var rssiWidth = 1; // Used when RSSI is zero or greater.
		if (beacon.rssi < -100) { rssiWidth = 100; }
		else if (beacon.rssi < 0) { rssiWidth = 100 + beacon.rssi; }
		// Scale values since they tend to be a bit low.
		rssiWidth *= 1.5;

		var html =
			'RSSI: ' + beacon.rssi + '<br />'
			+ '<div style="background:' + rgb + ';height:20px;width:'
			+ 		rssiWidth + '%;"></div>'

		return html;
	}

	return app;
})();

app.initialize();
