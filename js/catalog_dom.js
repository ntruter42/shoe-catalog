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
let divTimeout, msgTimeout;

// ==================== INITIALIZATION ==================== //

let catShoe = ShoeCatalog();

let sampleShoeMap = new Map([
	[1000, {
		'id': 1000,
		'brand': "Under Armour",
		'model': "Assert 9",
		'type': "Running Shoe",
		'price': 999,
		'like': false,
		'photos': {
			'index': 'black',
			'black': "./assets/images/shoes/ua-assert9-black.webp",
		},
		'sizeColorQuantity': {
			'6,black': 13,
			'7,black': 9,
			'8,black': 7,
			'9,black': 10,
		}
	}],
	[1001, {
		'id': 1001,
		'brand': "Under Armour",
		'model': "Micro G Valsetz",
		'type': "Tactical Boot",
		'price': 2899,
		'like': true,
		'photos': {
			'index': 'black',
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
		}
	}],
	[1002, {
		'id': 1002,
		'brand': "Adidas",
		'model': "Breaknet 2.0",
		'type': "Sneaker",
		'price': 1099,
		'like': false,
		'photos': {
			'index': 'black',
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
		}
	}],
	[1003, {
		'id': 1003,
		'brand': "Nike",
		'model': "Air Max 90",
		'type': "Sneaker",
		'price': 2499,
		'like': false,
		'photos': {
			'index': 'black',
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
		}
	}]
]);

catShoe.setShoeMap(sampleShoeMap);
displayShoeCards(catShoe.getShoeMap());

// ==================== NAVIGATION HANDLING ==================== //

// TODO: fix buggy expand timing / icon dimming
function expandSearch() {
	navSearch.parentElement.querySelector('.ui-icon').classList.add('remove-icon-filter');
	navSearch.classList.add('expand-site-search');
	setTimeout(() => {
		navSearch.focus();
	}, timeout);
}

function contractSearch() {
	setTimeout(() => {
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

function displayShoeCards(shoeMap) {
	const data = {
		shoes: []
	}

	for (const [shoeID, shoe] of shoeMap) {
		let sizeColors = Object.keys(shoe.sizeColorQuantity);

		let sizes = [];
		let colors = [];
		for (let i = 0; i < sizeColors.length; i++) {
			let [size, color] = sizeColors[i].split(',');

			if (!sizes.includes(size)) {
				sizes.push(size);
			}

			color = color.charAt(0).toUpperCase() + color.slice(1);
			if (!colors.includes(color)) {
				colors.push(color);
			}
		}

		let currShoe = {
			id: shoeID,
			photo: shoe.photos[shoe.photos.index],
			price: shoe.price.toFixed(2),
			brand: shoe.brand,
			model: shoe.model,
			type: shoe.type,
			sizes: sizes.join(', '),
			colors: colors.join(', ')
		};

		if (shoe.like === false) {
			currShoe['dim'] = 'dim';
		}

		data.shoes.push(currShoe);
	}

	const shoeCardContents = shoeTemplate(data);
	displayWindow.innerHTML = shoeCardContents;
	setLikeBtnEvents();
	setImgClickEvents();
}

function setLikeBtnEvents() {
	const likeBtns = document.querySelectorAll('.shoe-like');
	likeBtns.forEach(button => {
		button.addEventListener('click', () => {
			catShoe.toggleLike(button.alt);
			displayShoeCards(catShoe.getShoeMap());
		});
	});
}

function setImgClickEvents() {
	const shoeImgs = document.querySelectorAll('.shoe-img');
	shoeImgs.forEach(img => {
		img.addEventListener('click', () => {
			catShoe.setMessage(img.alt, "success");
			showMessage();
		});
	});
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
	clearTimeout(msgTimeout);
	message = catShoe.getMessage();
	if (message.text !== '') {
		messageBox.children[0].innerHTML = message.text;
		messageBox.classList.add(message.type);
		showDiv(messageBox);
		msgTimeout = setTimeout(function () {
			hideDiv(messageBox);
			messageBox.classList.remove(message.type);
		}, timeout * 10);
	}
}

// ==================== EXTRA FUNCTIONALITY ==================== //

function showDiv(element) {
	clearTimeout(divTimeout);
	let div;
	if (element instanceof HTMLElement) {
		div = element;
	} else if (typeof element === 'string') {
		div = document.querySelector('.' + element);
	} else {
		return;
	}
	div.classList.remove('hidden');
	divTimeout = setTimeout(() => {
		div.classList.remove('hide-div');
		div.classList.add('show-div');
	}, 0);
}

function hideDiv(element) {
	clearTimeout(divTimeout);
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

	divTimeout = setTimeout(() => {
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

navCartBtn.addEventListener('click', function () {
	catShoe.setMessage("This feature isn't built yet :/", "warning");
	showMessage();
});

navAddBtn.addEventListener('click', function () {
	catShoe.setMessage("This feature isn't built yet :/", "warning");
	showMessage();
});