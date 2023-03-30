$(document).ready(function() {
	var currentServiceItem = 1;
	var numServiceItems = $(".service-item").length;
  
	// Hide all service items except the first one
	$(".service-item:not(:first)").hide();
  
	// Switch to the next service item every 3 seconds
	setInterval(function() {
	  if (currentServiceItem < numServiceItems) {
		$("#service-item-" + currentServiceItem).hide();
		currentServiceItem++;
		$("#service-item-" + currentServiceItem).fadeIn();
	  } else {
		$("#service-item-" + currentServiceItem).hide();
		currentServiceItem = 1;
		$("#service-item-" + currentServiceItem).fadeIn();
	  }
	}, 5000);
  });
  