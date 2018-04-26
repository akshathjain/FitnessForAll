/*
Name: Akshath Jain
Date: 4/25/18
Purpose: just moved navbar scripts to separate file
*/

$(document).ready(function() {
	var menuClicked = false;
	checkPosition(menuClicked); //check the page position on init

	//function to constantly check the scroll position
	$(document).scroll(function(){
		checkPosition(menuClicked);
	});

    //function to check to see if hamburger menu button clicked
    document.getElementById("navbarCollapseButton").addEventListener("click", function(){
    	menuClicked = !menuClicked;
    	checkPosition(menuClicked);
    });

	//function that checks the page position and edits how the navbar looks based on where the user has scrolled
	function checkPosition(menuStatus){
		var position = $(this).scrollTop();
		if(position == 0){
			if(!menuStatus){
				$(".navbar").removeClass("navbarStateWhenScrolled");
			}else{
				$(".navbar").addClass("navbarStateWhenScrolled");
			}
		}else{
			$(".navbar").addClass("navbarStateWhenScrolled");
		}
	}
});