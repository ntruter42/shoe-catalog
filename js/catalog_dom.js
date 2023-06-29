// ----- TEMPLATE SETUP ----- //
const shoeTemplate = Handlebars.compile(document.querySelector('.shoe-template').innerHTML);

// ----- INPUT ELEMENTS ----- //
const navSearch = document.querySelector('.search-input');
const navUserBtn = document.querySelector('.nav-user');
const navCartBtn = document.querySelector('.nav-cart');
const navAddBtn = document.querySelector('.nav-add');

const loginBtn = document.querySelector('.user-login');
const loginName = document.querySelector('.user-name');
const loginPass = document.querySelector('.user-password');

const filterBtn = document.querySelector('.filter-button');
const sortOption = document.querySelector('.sort-category');

const exitBtns = document.querySelectorAll('.div-exit');

// ----- OUTPUT ELEMENTS ----- //
const catalogSection = document.querySelector('.catalog-section');
const catalogMenu = document.querySelector('.catalog-menu');
const filterBar = document.querySelector('.filter-bar');
const displayWindow = document.querySelector('.display-window');
const shoeCards = document.querySelectorAll('.shoe-card');

const userLogin = document.querySelector('.user-login-form');
const messageBox = document.querySelector('.message-box');

// ----- VARIABLES ----- //
let timeout = 250;
let timeoutID;

// ==================== INITIALIZATION ==================== //

let catShoe = ShoeCatalog();

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
			'black': "./assets/images/shoes/adidas-breaknet2-black.avif",
			'white': "./assets/images/shoes/adidas-breaknet2-white.avif",
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

catShoe.setShoeList(sampleShoeList);
displayShoeCards(catShoe.getShoeList());

// ==================== NAVIGATION HANDLING ==================== //

function expandSearch() {
	clearTimeout(timeoutID);
	navSearch.parentElement.querySelector('.ui-icon').classList.add('remove-icon-filter');
	navSearch.classList.add('expand-site-search');
	timeoutID = setTimeout(() => {
		navSearch.focus();
	}, timeout);
}

function contractSearch() {
	clearTimeout(timeoutID);
	timeoutID = setTimeout(() => {
		navSearch.parentElement.querySelector('.ui-icon').classList.remove('remove-icon-filter');
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

// ==================== DISPLAY WINDOW HANDLING ==================== //

function sortShoeCards() {
	let order = sortOption.value;
}

function displayShoeCards(shoeList) {
	const data = {
		shoes: []
	}

	for (let id in shoeList) {
		let shoe = shoeList[id];

		let sizeColors = Object.keys(shoe.sizeColorQuantity);

		let sizes = [];
		let colors = [];
		for (let i = 0; i < sizeColors.length; i++) {
			let [size, color] = sizeColors[i].split(',');

			if (!sizes.includes(size)) {	
				sizes.push(size);
			}

			color = color.charAt(0).toUpperCase() + color.slice(1);
			if (!colors.includes(color)){	
				colors.push(color);
			}
		}

		data.shoes.push({
			photoURL: shoe.photoURL[Object.keys(shoe.photoURL)[0]],
			price: shoe.price.toFixed(2),
			title: shoe.brand + ' ' + shoe.model + ' ' + shoe.type,
			sizes: sizes.join(', '),
			colors: colors.join(', ')
		});
	}

	const shoeCardContents = shoeTemplate(data);
	displayWindow.innerHTML = shoeCardContents;
}

// ==================== SHOPPING CART HANDLING ==================== //

// ==================== ADMIN USER HANDLING ==================== //

function showLoginForm() {
	showDiv(userLogin);
	userLogin.childNodes[9].focus();
}

function logUserIn() {
	if (loginName.value === '' || loginPass.value === '') {
		catShoe.setMessage("Fill in the form :|", "error");
	} else if (loginName.value === 'admin' && loginPass.value === 'admin') {
		navCartBtn.classList.add('hidden');
		navAddBtn.classList.remove('hidden');
		userLogin.document.querySelector('.exit-button').click();
	} else if (loginName.value === 'user' && loginPass.value === 'password') {
		navCartBtn.classList.remove('hidden');
		navAddBtn.classList.add('hidden');
		userLogin.document.querySelector('.exit-button').click();
	} else {
		catShoe.setMessage("Username or password is incorrect :(", "error");
	}
	showMessage();
}

// ==================== MESSAGE HANDLING ==================== //

function showMessage() {
	message = catShoe.getMessage();
	if (message.text !== '') {
		messageBox.children[0].innerHTML = message.text;
		messageBox.classList.add(message.type);
		showDiv(messageBox);
		setTimeout(function () {
			hideDiv(messageBox);
			messageBox.classList.remove(message.type);
		}, timeout * 8);
	}
}

// ==================== EXTRA FUNCTIONALITY ==================== //

function showDiv(element) {
	let div;
	if (element instanceof HTMLElement) {
		div = element;
	} else if (typeof element === 'string') {
		div = document.querySelector('.' + element);
	} else {
		return;
	}
	div.classList.remove('hidden');
	setTimeout(() => {
		div.classList.remove('hide-div');
		div.classList.add('show-div');
	}, 0);
}

function hideDiv(element) {
	let div;
	if (element instanceof HTMLElement) {
		div = element;
	} else if (typeof element === 'string') {
		div = document.querySelector('.' + element);
	} else {
		return;
	}
	div.classList.remove('show-div');
	div.classList.add('hide-div');

	setTimeout(() => {
		div.classList.add('hidden');
	}, timeout);
}

// ==================== EVENT LISTENERS ==================== //

navSearch.parentNode.addEventListener('click', expandSearch);
navSearch.parentNode.addEventListener('focusout', contractSearch);
navUserBtn.addEventListener('click', showLoginForm);

filterBtn.addEventListener('click', toggleFilterBar);
sortOption.addEventListener('change', sortShoeCards);

loginBtn.addEventListener('click', logUserIn);

exitBtns.forEach(button => {
	button.addEventListener('click', function () {
		hideDiv(button.parentElement);
	});
});

document.querySelectorAll('.shoe-like').forEach(likeButton => {
	likeButton.addEventListener('click', function () {
		catShoe.setMessage("Your like is acknowledged ;)", "success");
		showMessage();
	});
});

navCartBtn.addEventListener('click', function () {
	catShoe.setMessage("This feature isn't built yet :/", "warning");
	showMessage();
});

navAddBtn.addEventListener('click', function () {
	catShoe.setMessage("This feature isn't built yet :/", "warning");
	showMessage();
});