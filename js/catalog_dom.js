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

let sampleShoeList = {
	'1000': {
		'brand': "Under Armour",
		'model': "Assert 9",
		'type': "Running Shoe",
		'price': 999,
		'photoURL': {
			'black': "./assets/images/shoes/ua-assert9-black.webp",
		},
		'sizeColorQuantity': {
			'6,black': 13,
			'7,black': 9,
			'8,black': 7,
			'9,black': 10,
		},
	},
	'1001': {
		'brand': "Under Armour",
		'model': "Micro G Valsetz",
		'type': "Tactical Boot",
		'price': 2899,
		'photoURL': {
			'black': "./assets/images/shoes/ua-mircogvalsetz-black.webp",
			'gold': "./assets/images/shoes/ua-mircogvalsetz-gold.webp",
		},
		'sizeColorQuantity': {
			'7,black': 3,
			'7,gold': 2,
			'8,black': 6,
			'8,gold': 3,
			'9,black': 2,
			'10,black': 5,
			'10,gold': 1,
		},
	},
	'1002': {
		'brand': "Adidas",
		'model': "Breaknet 2.0",
		'type': "Sneaker",
		'price': 1099,
		'photoURL': {
			'black': "./assets/images/shoes/adidas-breaknet2-white.avif",
			'white': "./assets/images/shoes/adidas-breaknet2-black.avif",
		},
		'sizeColorQuantity': {
			'6,black': 11,
			'6,white': 5,
			'7,black': 12,
			'7,white': 11,
			'8,black': 9,
			'8,white': 4,
			'9,white': 2,
		},
	},
	'1003': {
		'brand': "Nike",
		'model': "Air Max 90",
		'type': "Sneaker",
		'price': 2499,
		'photoURL': {
			'black': "./assets/images/shoes/nike-airmax90-black.webp",
		},
		'sizeColorQuantity': {
			'4,black': 1,
			'5,black': 5,
			'6,black': 4,
			'7,black': 7,
			'8,black': 5,
			'9,black': 2,
			'10,black': 4,
			'11,black': 2,
		},
	},
};

// ==================== NAVIGATION HANDLING ==================== //

function expandSearch() {
	clearTimeout(timeoutID);
	siteSearch.parentNode.firstElementChild.classList.add('remove-icon-filter');
	siteSearch.classList.add('expand-site-search');
	timeoutID = setTimeout(() => {
		siteSearch.focus();
	}, timeout * 2);
}

function contractSearch() {
	clearTimeout(timeoutID);
	siteSearch.parentNode.firstElementChild.classList.remove('remove-icon-filter');
	timeoutID = setTimeout(() => {
		siteSearch.classList.remove('expand-site-search');
	}, timeout);
}

// ==================== CATALOG HANDLING ==================== //

function toggleFilterBar() {
	if (filterBar.classList.contains("expand-filter-bar")) {
		filterBar.classList.remove("expand-filter-bar");
		displayWindow.classList.remove("shrink-catalog-section");
		catalogMenu.classList.remove("shrink-catalog-section");
	} else {
		filterBar.classList.add("expand-filter-bar");
		displayWindow.classList.add("shrink-catalog-section");
		catalogMenu.classList.add("shrink-catalog-section");
	}
}

// ==================== SHOPPING CART HANDLING ==================== //

// ==================== ADMIN USER HANDLING ==================== //

// ==================== MESSAGE HANDLING ==================== //

// ==================== EXTRA FUNCTIONALITY ==================== //

// ==================== EVENT LISTENERS ==================== //

filterButton.addEventListener("click", toggleFilterBar);

siteSearch.parentNode.addEventListener('click', expandSearch);
siteSearch.parentNode.addEventListener('focusout', contractSearch);
