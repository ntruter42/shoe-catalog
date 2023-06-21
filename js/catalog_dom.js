// ----- TEMPLATE SETUP ----- //

// ----- INPUT ELEMENTS ----- //
const search = document.querySelector('#site-search');

// ----- OUTPUT ELEMENTS ----- //

// ----- VARIABLES ----- //

// ==================== INITIALIZATION ==================== //

// ==================== NAVIGATION HANDLING ==================== //

search.parentNode.addEventListener('mouseover', function () {
	search.style.width = "calc(100% - 45px)";
	search.style.color = "#000";
});

search.addEventListener('focusout', function () {
	search.style.width = "20px";
	search.style.color = "#0000";
});

search.parentNode.addEventListener('mouseleave', function (event) {
	if (document.activeElement !== search) {
		search.style.width = "20px";
		search.style.color = "#0000";
	}
});

// ==================== SHOPPING CART HANDLING ==================== //

// ==================== DISPLAY HANDLING ==================== //

// ==================== MESSAGE HANDLING ==================== //

// ==================== EXTRA FUNCTIONALITY ==================== //

// ==================== EVENT LISTENERS ==================== //