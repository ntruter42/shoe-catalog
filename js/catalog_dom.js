// ----- TEMPLATE SETUP ----- //

// ----- INPUT ELEMENTS ----- //
const search = document.querySelector('#site-search');
const filter = document.querySelector('.filter-bar');

// ----- OUTPUT ELEMENTS ----- //
const catalog = document.querySelector('.catalog-section');
const displayWindow = document.querySelector('.display-window');

// ----- VARIABLES ----- //

// ==================== INITIALIZATION ==================== //

// ==================== NAVIGATION HANDLING ==================== //

search.parentNode.addEventListener('mouseover', function () {
	search.style.width = "calc(100% - 44px)";
	search.style.color = "#000";
});

search.parentNode.addEventListener('focusin', function () {
	search.style.width = "calc(100% - 44px)";
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

// ==================== CATALOG HANDLING ==================== //

catalog.addEventListener("mousemove", function (event) {
	if (event.pageX <= 50) {
		filter.classList.add("expand-filter-bar");
		displayWindow.classList.add("shrink-display-window");
	}
});

catalog.addEventListener("mouseleave", function (event) {
	setTimeout(function () {
		filter.classList.remove("expand-filter-bar");
		displayWindow.classList.remove("shrink-display-window");
	}, 1000);
});

filter.addEventListener("mouseleave", function (event) {
	setTimeout(function () {
		filter.classList.remove("expand-filter-bar");
		displayWindow.classList.remove("shrink-display-window");
	}, 1000);
});

// ==================== SHOPPING CART HANDLING ==================== //

// ==================== ADMIN USER HANDLING ==================== //

// ==================== MESSAGE HANDLING ==================== //

// ==================== EXTRA FUNCTIONALITY ==================== //

// ==================== EVENT LISTENERS ==================== //