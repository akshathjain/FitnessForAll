/*
Name: Akshath Jain
Date: 4/15/18
Purpose: FFA Website scripts
*/

$(document).ready(function(){
	// Add smooth scrolling to all links
	$("a:not([data-toggle])").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            //event.preventDefault();
            
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