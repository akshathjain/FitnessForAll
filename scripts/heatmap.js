/*
Name: Akshath Jain
Date: 4/23/18
Purpose: styles and heat map function for obesity map
*/

$(document).ready(function(){
	//create obesity heat map
	createHeatMap("obesity-heat-map", "obesity-heat-map-container", "https://akshathjain.com/FitnessForAll/assets/obesityRates.json", 243, 212, 184, 211, 102, 0, 0.5, function(data, stateSpecificStyles){
		//add styles to the map
		$("#obesity-heat-map").usmap({
			//define map styles
			stateStyles:{
				stroke:'#ffffff',
				"stroke-width": 1
			},
			//define hover styles
			stateHoverStyles:{
				stroke: "#843f00",
				"stroke-width":3
			},
			stateHoverAnimation: 100,
			showLabels: false,
			stateSpecificStyles:stateSpecificStyles
		});

		//define mouseover functionality
		$("#obesity-heat-map").on("usmapmouseover", function(event, stateName){
			var legend = document.getElementById('obesity-state-legend');
			var legendName = legend.getElementsByTagName('p')[0];
			var legendPercent = legend.getElementsByTagName('p')[2];
			var legendRank = legend.getElementsByTagName('p')[4];

			var state, rank
			for(var i = 0; i < data.length; i++){
				if(data[i].abbreviation == stateName.name){
					state = data[i];
					rank = 50 - i;
					break;
				}
			}

			legendName.innerHTML = state.state;
			legendPercent.innerHTML = (state.y2016 * 100).toFixed(1) + "%";
			legendRank.innerHTML = "#" + rank;
		});

		//mouse has left
		$("#obesity-heat-map").on("usmapmouseout", function(event, data){
			var legend = document.getElementById('obesity-state-legend');
			var legendName = legend.getElementsByTagName('p')[0];
			var legendPercent = legend.getElementsByTagName('p')[2];
			var legendRank = legend.getElementsByTagName('p')[4];

			legendName.innerHTML = "United States";
			legendPercent.innerHTML = "34.6%";
			legendRank.innerHTML = "#12 (global)";
		});
	});

	//create heartdisease heat map
	createHeatMap("heartdisease-heat-map", "heartdisease-heat-map-container", "https://akshathjain.com/FitnessForAll/assets/heartdiseaseRates.json", 236, 195, 198, 201, 0, 0, 1.2, function(data, stateSpecificStyles){
		//add styles to the map
		$("#heartdisease-heat-map").usmap({
			//define map styles
			stateStyles:{
				stroke:'#ffffff',
				"stroke-width": 1
			},
			//define hover styles
			stateHoverStyles:{
				stroke: "#800000",
				"stroke-width":3
			},
			stateHoverAnimation: 100,
			showLabels: false,
			stateSpecificStyles:stateSpecificStyles
		});

		//define mouseover functionality
		$("#heartdisease-heat-map").on("usmapmouseover", function(event, stateName){
			var legend = document.getElementById('heartdisease-state-legend');
			var legendName = legend.getElementsByTagName('p')[0];
			var legendRate = legend.getElementsByTagName('p')[2];
			var legendRank = legend.getElementsByTagName('p')[4];

			var state, rank;
			for(var i = 0; i < data.length; i++){
				if(data[i].abbreviation == stateName.name){
					state = data[i];
					rank = 50 - i;
					break;
				}
			}

			legendName.innerHTML = state.state;
			legendRate.innerHTML = state.y2016;
			legendRank.innerHTML = "#" + rank;
		});

		//mouse has left
		$("#heartdisease-heat-map").on("usmapmouseout", function(event, data){
			var legend = document.getElementById('heartdisease-state-legend');
			var legendName = legend.getElementsByTagName('p')[0];
			var legendRate = legend.getElementsByTagName('p')[2];
			var legendRank = legend.getElementsByTagName('p')[4];

			legendName.innerHTML = "United States";
			legendRate.innerHTML = "165.5";
			legendRank.innerHTML = "#4 (global)";
		});
	});

	//create uninsured heat map
	createHeatMap("uninsured-heat-map", "uninsured-heat-map-container", "https://akshathjain.com/FitnessForAll/assets/uninsuredRates.json", 211, 236, 255, 3, 93, 163, .5, function(data, stateSpecificStyles){
		//add styles to the map
		$("#uninsured-heat-map").usmap({
			//define map styles
			stateStyles:{
				stroke:'#ffffff',
				"stroke-width": 1
			},
			//define hover styles
			stateHoverStyles:{
				stroke: "#002b4c",
				"stroke-width":3
			},
			stateHoverAnimation: 100,
			showLabels: false,
			stateSpecificStyles:stateSpecificStyles
		});

		//define mouseover functionality
		$("#uninsured-heat-map").on("usmapmouseover", function(event, stateName){
			var legend = document.getElementById('uninsured-state-legend');
			var legendName = legend.getElementsByTagName('p')[0];
			var legendRate = legend.getElementsByTagName('p')[2];
			var legendRank = legend.getElementsByTagName('p')[4];

			var state, rank;
			for(var i = 0; i < data.length; i++){
				if(data[i].abbreviation == stateName.name){
					state = data[i];
					rank = 50 - i;
					break;
				}
			}

			legendName.innerHTML = state.state;
			legendRate.innerHTML = (state.y2016 * 100).toFixed(1) + "%";
			legendRank.innerHTML = "#" + rank;
		});

		//mouse has left
		$("#uninsured-heat-map").on("usmapmouseout", function(event, data){
			var legend = document.getElementById('uninsured-state-legend');
			var legendName = legend.getElementsByTagName('p')[0];
			var legendRate = legend.getElementsByTagName('p')[2];
			var legendRank = legend.getElementsByTagName('p')[4];

			legendName.innerHTML = "United States";
			legendRate.innerHTML = "9.0%";
			legendRank.innerHTML = "#33 (OECD countries)";
		});
	});
});

//deal with screen size change
$(window).resize(function(){
	calculateMapSize("obesity-heat-map-container", "obesity-heat-map");
	calculateMapSize("heartdisease-heat-map-container", "heartdisease-heat-map");
	calculateMapSize("uninsured-heat-map-container", "uninsured-heat-map");
});

function calculateMapSize(containerID, mapID){
	var container = document.getElementById(containerID);
	var map = document.getElementById(mapID);
	var svg = map.getElementsByTagName("svg")[0];	
	var padding = parseFloat($("#"+containerID).css('padding-left')) + parseFloat($("#"+containerID).css('padding-right'));
	var width = container.offsetWidth - padding;
	map.style.width = width + "px";
	map.style.height = (width * 6/9.0) + "px";
	svg.style.width = width + "px";
	svg.style.height = (width * 6/9.0) + "px";
}

function createHeatMap(mapID, mapContainer, mapDataLink, r0, g0, b0, r1, g1, b1, powReduce, callback){
	//powReduce * powIncrease = 1 (always)
	var powIncrease = 1 / powReduce;

	//reduce the colors so when scaled back up, the color gradient is more log (humans view log scale) - this is an easy way to do that w/o getting too mathematical
	r0 = Math.pow(r0, powReduce);
	g0 = Math.pow(g0, powReduce);
	b0 = Math.pow(b0, powReduce);

	//scale down
	r1 = Math.pow(r1, powReduce); 
	g1 = Math.pow(g1, powReduce); 
	b1 = Math.pow(b1, powReduce);

	$.getJSON(mapDataLink, function(data){
		//sort data
		data.sort(function(a,b){
			return a.y2016 - b.y2016;
		});

		//recolor all of the states
		var stateStyles = new Object();
		var min = data[0].y2016; //this is the lowest number
		var max = data[data.length - 1].y2016; //scale the highest number - lowest up to 1
		for(var i = data.length - 1; i >= 0; i--){
			var fillColor = new Object();

			//calculate new rgb values
			var rc = Math.pow((r1 - r0) / (max - min) * (data[i].y2016 - max) + r1, powIncrease);
			var gc = Math.pow((g1 - g0) / (max - min) * (data[i].y2016 - max) + g1, powIncrease);
			var bc = Math.pow((b1 - b0) / (max - min) * (data[i].y2016 - max) + b1, powIncrease);

			fillColor['fill'] = "rgb(" + rc + "," + gc + "," + bc + ")";
			stateStyles[data[i].abbreviation] = fillColor;
		}

		callback(data, stateStyles);

		//calculate map size once map loaded
		calculateMapSize(mapContainer, mapID);
	});
}