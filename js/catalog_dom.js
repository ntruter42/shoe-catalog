// ----- TEMPLATE SETUP ----- //

// ----- INPUT ELEMENTS ----- //
const siteSearch = document.querySelector('.search-input');
const filterButton = document.querySelector('.filter-button');
const filterBar = document.querySelector('.filter-bar');

// ----- OUTPUT ELEMENTS ----- //
const catalogSection = document.querySelector('.catalog-section');
const displayWindow = document.querySelector('.display-window');
const shoeCards = document.querySelectorAll('.shoe-card');

// ----- VARIABLES ----- //
let timeout = 250;
let timeoutID;

// ==================== INITIALIZATION ==================== //

// ==================== NAVIGATION HANDLING ==================== //

siteSearch.parentNode.addEventListener('click', function () {
	clearTimeout(timeoutID);
	siteSearch.focus();
	siteSearch.classList.add('expand-site-search');
	siteSearch.parentNode.firstElementChild.classList.add('remove-icon-filter');
});

// siteSearch.parentNode.addEventListener('focusin', function () {
// 	clearTimeout(timeoutID);
// 	siteSearch.classList.add('expand-site-search');
// });

// siteSearch.parentNode.addEventListener('mouseover', function () {
// 	clearTimeout(timeoutID);
// 	siteSearch.parentNode.firstElementChild.classList.add('remove-icon-filter');
// 	timeoutID = setTimeout(() => {
// 		siteSearch.classList.add('expand-site-search');
// 	}, timeout);
// });

siteSearch.parentNode.addEventListener('focusout', function () {
	clearTimeout(timeoutID);
	siteSearch.parentNode.firstElementChild.classList.remove('remove-icon-filter');
	timeoutID = setTimeout(() => {
		siteSearch.classList.remove('expand-site-search');
	}, timeout);
});

// siteSearch.parentNode.addEventListener('mouseleave', function () {
// 	clearTimeout(timeoutID);
// 	timeoutID = setTimeout(() => {
// 		if (document.activeElement !== siteSearch) {
// 			siteSearch.parentNode.firstElementChild.classList.remove('remove-icon-filter');
// 			siteSearch.classList.remove('expand-site-search');
// 		}
// 	}, timeout * 4);
// });

// ==================== CATALOG HANDLING ==================== //

// filterButton.addEventListener("click", function () {
// 	if (filterBar.classList.contains("expand-filter-bar")) {
// 		filterBar.classList.remove("expand-filter-bar");
// 		displayWindow.classList.remove("shrink-display-window");
// 	} else {
// 		filterBar.classList.add("expand-filter-bar");
// 		displayWindow.classList.add("shrink-display-window");
// 	}
// });

// ==================== SHOPPING CART HANDLING ==================== //

// ==================== ADMIN USER HANDLING ==================== //

// ==================== MESSAGE HANDLING ==================== //

// ==================== EXTRA FUNCTIONALITY ==================== //

// ==================== EVENT LISTENERS ==================== //