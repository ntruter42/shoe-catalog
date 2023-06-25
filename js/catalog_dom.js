// ----- TEMPLATE SETUP ----- //

// ----- INPUT ELEMENTS ----- //
const siteSearch = document.querySelector('.search-input');
const filterButton = document.querySelector('.filter-button');
const filterBar = document.querySelector('.filter-bar');

// ----- OUTPUT ELEMENTS ----- //
const catalogSection = document.querySelector('.catalog-section');
const catalogMenu = document.querySelector('.catalog-menu');
const displayWindow = document.querySelector('.display-window');
const shoeCards = document.querySelectorAll('.shoe-card');

// ----- VARIABLES ----- //
let timeout = 250;
let timeoutID;

// ==================== INITIALIZATION ==================== //

// ==================== NAVIGATION HANDLING ==================== //

siteSearch.parentNode.addEventListener('click', function () {
	clearTimeout(timeoutID);
	siteSearch.parentNode.firstElementChild.classList.add('remove-icon-filter');
	siteSearch.classList.add('expand-site-search');
	timeoutID = setTimeout(() => {
		siteSearch.focus();
	}, timeout * 2);
});

siteSearch.parentNode.addEventListener('focusout', function () {
	clearTimeout(timeoutID);
	siteSearch.parentNode.firstElementChild.classList.remove('remove-icon-filter');
	timeoutID = setTimeout(() => {
		siteSearch.classList.remove('expand-site-search');
	}, timeout);
});

// ==================== CATALOG HANDLING ==================== //

filterButton.addEventListener("click", function () {
	if (filterBar.classList.contains("expand-filter-bar")) {
		filterBar.classList.remove("expand-filter-bar");
		displayWindow.classList.remove("shrink-catalog-section");
		catalogMenu.classList.remove("shrink-catalog-section");
	} else {
		filterBar.classList.add("expand-filter-bar");
		displayWindow.classList.add("shrink-catalog-section");
		catalogMenu.classList.add("shrink-catalog-section");
	}
});

// ==================== SHOPPING CART HANDLING ==================== //

// ==================== ADMIN USER HANDLING ==================== //

// ==================== MESSAGE HANDLING ==================== //

// ==================== EXTRA FUNCTIONALITY ==================== //

// ==================== EVENT LISTENERS ==================== //