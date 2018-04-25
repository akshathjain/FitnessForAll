/*
Name: Akshath Jain
Date: 4/23/18
Purpose: styles and heat map function for obesity map
*/

$(document).ready(function(){
	var obesityData;

	//humans view color changes on a log scale - this is an easy way to do that w/o getting too mathematical
	var powReduce = 0.5;
	var powIncrease = 1 / powReduce; //powReduce * powIncrease = 1 (always)

	//define what the lowest state should look like
	var r0 = Math.pow(243, powReduce), g0 = Math.pow(212, powReduce), b0 = Math.pow(184, powReduce);
	//define what the highest state should look like
	var r1 = Math.pow(211, powReduce), g1 = Math.pow(102, powReduce), b1 = Math.pow(0, powReduce);

	//get obesity data
	$.getJSON("https://akshathjain.com/FitnessForAll/assets/obesityRates.json", function(data){
		obesityData = data;

		//sort data
		obesityData.sort(function(a,b){
			return a.y2016 - b.y2016;
		});

		//recolor all of the states
		var stateStyles = new Object();
		var min = obesityData[0].y2016; //this is the lowest number
		var max = obesityData[obesityData.length - 1].y2016; //scale the highest number - lowest up to 1
		for(var i = obesityData.length - 1; i >= 0; i--){
			var fillColor = new Object();

			//calculate new rgb values
			var rc = Math.pow((r1 - r0) / (max - min) * (obesityData[i].y2016 - max) + r1, powIncrease);
			var gc = Math.pow((g1 - g0) / (max - min) * (obesityData[i].y2016 - max) + g1, powIncrease);
			var bc = Math.pow((b1 - b0) / (max - min) * (obesityData[i].y2016 - max) + b1, powIncrease);

			fillColor['fill'] = "rgb(" + rc + "," + gc + "," + bc + ")";
			stateStyles[obesityData[i].abbreviation] = fillColor;
		}

		//add styles to the map
		$("#obesity-heat-map").usmap({
			//define map styles
			stateStyles:{
				fill: "#1abc9c",
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
			stateSpecificStyles:stateStyles
		});

		//define mouseover functionality
		$("#obesity-heat-map").on("usmapmouseover", function(event, data){
			var label = document.getElementById('obesity-state-label')
			label.style.visibility = 'visible';

			var state;
			for(var i = 0; i < obesityData.length; i++){
				if(obesityData[i].abbreviation == data.name){
					state = obesityData[i];
					break;
				}
			}

			label.innerHTML = "<b>" + state.state + "</b><br>" + (state.y2016 * 100).toFixed(1) + "%";
		});
		//mouse has left
		$("#obesity-heat-map").on("usmapmouseout", function(event, data){
			document.getElementById('obesity-state-label').innerHTML = '<b>United States</b><br>34.3%';
		});

	});
});