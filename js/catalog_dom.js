// ----- TEMPLATE SETUP ----- //

// ----- INPUT ELEMENTS ----- //
const navSearch = document.querySelector('.search-input');
const navUserBtn = document.querySelector('.nav-user');
const navCartBtn = document.querySelector('.nav-cart');
const navAddBtn = document.querySelector('.nav-add-shoe');

const loginBtn = document.querySelector('.user-login');
const loginExit = document.querySelector('.user-exit');
const loginName = document.querySelector('.user-name');
const loginPass = document.querySelector('.user-password');

const filterBtn = document.querySelector('.filter-button');

// ----- OUTPUT ELEMENTS ----- //
const catalogSection = document.querySelector('.catalog-section');
const catalogMenu = document.querySelector('.catalog-menu');
const filterBar = document.querySelector('.filter-bar');
const displayWindow = document.querySelector('.display-window');
const shoeCards = document.querySelectorAll('.shoe-card');

const userLogin = document.querySelector('.user-login-form');
const messageBox = document.querySelector('.message-box');
const dimmer = document.querySelector('.dimmer');

// ----- VARIABLES ----- //
let timeout = 250;
let timeoutID;

// ==================== INITIALIZATION ==================== //

let shoeCatalog = ShoeCatalog();

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
	navSearch.parentNode.firstElementChild.classList.add('remove-icon-filter');
	navSearch.classList.add('expand-site-search');
	timeoutID = setTimeout(() => {
		navSearch.focus();
	}, timeout * 2);
}

function contractSearch() {
	clearTimeout(timeoutID);
	navSearch.parentNode.firstElementChild.classList.remove('remove-icon-filter');
	timeoutID = setTimeout(() => {
		navSearch.classList.remove('expand-site-search');
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

function showLoginForm() {
	userLogin.classList.add('show-div', 'focus');
	userLogin.childNodes[5].focus();
	dimmer.classList.remove('hidden');
}

function hideLoginForm() {
	userLogin.classList.remove('show-div', 'focus');
	dimmer.classList.add('hidden');
}

function logUserIn() {
	if (loginName.value === '' || loginPass.value === '') {
		shoeCatalog.setMessage("Fill in the form :|", "error");
	} else if (loginName.value === 'admin' && loginPass.value === 'admin') {
		navCartBtn.classList.add('hidden');
		navAddBtn.classList.remove('hidden');
		hideLoginForm();
	} else if (loginName.value === 'user' && loginPass.value === 'password') {
		navCartBtn.classList.remove('hidden');
		navAddBtn.classList.add('hidden');
		hideLoginForm();
	} else {
		shoeCatalog.setMessage("Username or password is incorrect :(", "error");
	}
	showMessage();
}

// ==================== MESSAGE HANDLING ==================== //

function showMessage() {
	message = shoeCatalog.getMessage();
	if (message.text !== '') {
		messageBox.childNodes[1].innerHTML = message.text;
		messageBox.classList.add(message.type, 'show-div', 'focus');
		dimmer.classList.remove('hidden');
	
		setTimeout(function () {
			messageBox.className = "message-box";
			dimmer.classList.add('hidden');
		}, timeout * 8);
	}
}

// ==================== EXTRA FUNCTIONALITY ==================== //

// ==================== EVENT LISTENERS ==================== //

filterBtn.addEventListener('click', toggleFilterBar);

navUserBtn.addEventListener('click', showLoginForm);
loginExit.addEventListener('click', hideLoginForm);
loginBtn.addEventListener('click', logUserIn);

navSearch.parentNode.addEventListener('click', expandSearch);
navSearch.parentNode.addEventListener('focusout', contractSearch);

document.querySelectorAll('.shoe-like').forEach(likeButton => {
	likeButton.addEventListener('click', function () {
		shoeCatalog.setMessage("Your like is acknowledged ;)", "success");
		showMessage();
	});
});

navCartBtn.addEventListener('click', function () {
	shoeCatalog.setMessage("This feature isn't built yet :/", "warning");
	showMessage();
});

navAddBtn.addEventListener('click', function () {
	shoeCatalog.setMessage("This feature isn't built yet :/", "warning");
	showMessage();
});