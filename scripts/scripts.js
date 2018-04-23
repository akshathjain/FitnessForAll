/*
Name: Akshath Jain
Date: 4/15/18
Purpose: FFA Website scripts
*/

$(document).ready(function(){
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
		var list = document.getElementsByClassName("nav-link-id");
		var spanList = document.getElementsByClassName("nav-span-id");
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

	// Add smooth scrolling to all links
	$("a:not([data-toggle])").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {

            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
            	scrollTop: $(hash).offset().top
            }, 800, function(){

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        }
    });
});

function linkHash(l){
	$('html, body').animate({
		scrollTop: $(l).offset().top
	}, 800, function(){
		window.location.hash = l;
	});
}