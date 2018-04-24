/*
Name: Akshath Jain
Date: 4/23/18
Purpose: styles and heat map function for obesity map
*/

$(document).ready(function(){
	
	//add styles to the map
	$("#obesity-heat-map").usmap({
		//define map styles
		stateStyles:{
			fill:'#1abc9c',
			stroke:'#ffffff'
		},

		//define hover styles
		stateHoverStyles:{
			'fill':'#0592FF'
		},
		stateHoverAnimation: 150,
		showLabels: false
	});

	//define mouseover functionality
	$("#obesity-heat-map").on("usmapmouseover", function(event, data){
		var label = document.getElementById('obesity-state-label')
		label.style.visibility = 'visible';

		var x = event.clientX;
		var y = event.clientY;
		label.innerHTML = data.name;
	});

	$("#obesity-heat-map").on("usmapmouseout", function(event, data){
		document.getElementById('obesity-state-label').innerHTML = 'United States';
	});
});