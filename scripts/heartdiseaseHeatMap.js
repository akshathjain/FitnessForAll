/*
Name: Akshath Jain
Date: 4/24/18
Purpose: styles and heat map function for heartdisease map
*/

$(document).ready(function(){
	var heartdiseaseData;

	//humans view color changes on a log scale - this is an easy way to do that w/o getting too mathematical
	var powReduce = 1.2;
	var powIncrease = 1 / powReduce; //powReduce * powIncrease = 1 (always)

	//define what the lowest state should look like
	var r0 = Math.pow(236, powReduce), g0 = Math.pow(195, powReduce), b0 = Math.pow(198, powReduce);
	//define what the highest state should look like
	var r1 = Math.pow(201, powReduce), g1 = Math.pow(0, powReduce), b1 = Math.pow(0, powReduce);

	//get heartdisease data
	$.getJSON("https://akshathjain.com/FitnessForAll/assets/heartdiseaseRates.json", function(data){
		heartdiseaseData = data;

		//sort data
		heartdiseaseData.sort(function(a,b){
			return a.y2016 - b.y2016;
		});

		//recolor all of the states
		var stateStyles = new Object();
		var min = heartdiseaseData[0].y2016; //this is the lowest number
		var max = heartdiseaseData[heartdiseaseData.length - 1].y2016; //scale the highest number - lowest up to 1
		for(var i = heartdiseaseData.length - 1; i >= 0; i--){
			var fillColor = new Object();

			//calculate new rgb values
			var rc = Math.pow((r1 - r0) / (max - min) * (heartdiseaseData[i].y2016 - max) + r1, powIncrease);
			var gc = Math.pow((g1 - g0) / (max - min) * (heartdiseaseData[i].y2016 - max) + g1, powIncrease);
			var bc = Math.pow((b1 - b0) / (max - min) * (heartdiseaseData[i].y2016 - max) + b1, powIncrease);

			fillColor['fill'] = "rgb(" + rc + "," + gc + "," + bc + ")";
			stateStyles[heartdiseaseData[i].abbreviation] = fillColor;
		}

		//add styles to the map
		$("#heartdisease-heat-map").usmap({
			//define map styles
			stateStyles:{
				fill: "#1abc9c",
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
			stateSpecificStyles:stateStyles
		});

		//define mouseover functionality
		$("#heartdisease-heat-map").on("usmapmouseover", function(event, data){
			var label = document.getElementById('heartdisease-state-label')
			label.style.visibility = 'visible';

			var state;
			for(var i = 0; i < heartdiseaseData.length; i++){
				if(heartdiseaseData[i].abbreviation == data.name){
					state = heartdiseaseData[i];
					break;
				}
			}

			label.innerHTML = "<b>" + state.state + "</b><br>" + state.y2016 + " deaths per 100,000";
		});
		//mouse has left
		$("#heartdisease-heat-map").on("usmapmouseout", function(event, data){
			document.getElementById('heartdisease-state-label').innerHTML = '<b>United States</b><br>165.5 deaths per 100,000';
		});

		//calculate map size once map loaded
		calculateMapSize("heartdisease-heat-map-container", "heartdisease-heat-map");
	});

	//deal with screen size change
	$(window).resize(function(){
		calculateMapSize("heartdisease-heat-map-container", "heartdisease-heat-map");
	});
});