// ----- TEMPLATE SETUP ----- //

// ----- INPUT ELEMENTS ----- //
const search = document.querySelector('#site-search');
const filter = document.querySelector('.filter-bar');
const filterButton = document.querySelector('#filter-button');

// ----- OUTPUT ELEMENTS ----- //
const catalog = document.querySelector('.catalog-section');
const displayWindow = document.querySelector('.display-window');
const shoeCards = document.querySelectorAll('.shoe-card');

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

filterButton.addEventListener("click", function () {
	if (filter.classList.contains("expand-filter-bar")) {
		filter.classList.remove("expand-filter-bar");
		displayWindow.classList.remove("shrink-display-window");
	} else {
		filter.classList.add("expand-filter-bar");
		displayWindow.classList.add("shrink-display-window");
	}
});

shoeCards.forEach(card => {
	card.addEventListener('click', function () {
		if (card.classList.contains("huge")) {
			card.classList.remove('huge');
			setTimeout(() => {
				card.scrollIntoView({ behavior: "smooth", block: "nearest" });
			}, 300);
		} else {
			card.classList.add('huge');
			setTimeout(() => {
				card.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
			}, 300);
		}
	});

	document.addEventListener("click", function (event) {
		if (!card.contains(event.target)) {
			displayWindow.classList.remove('shift-display-window');
			card.classList.remove("huge");
		}
	});
});

// ==================== SHOPPING CART HANDLING ==================== //

// ==================== ADMIN USER HANDLING ==================== //

// ==================== MESSAGE HANDLING ==================== //

// ==================== EXTRA FUNCTIONALITY ==================== //

// ==================== EVENT LISTENERS ==================== //