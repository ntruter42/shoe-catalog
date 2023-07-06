// ----- TEMPLATE SETUP ----- //
const shoeTemplate = Handlebars.compile(document.querySelector('.shoe-template').innerHTML);
const filterTemplate = Handlebars.compile(document.querySelector('.filter-template').innerHTML);

// ----- INPUT ELEMENTS ----- //
const navSearch = document.querySelector('.search-input');
const navUserBtn = document.querySelector('.nav-user');
const navCartBtn = document.querySelector('.nav-cart');
const navAddBtn = document.querySelector('.nav-add');

const loginForm = document.querySelector('.user-login-form');
const loginName = document.querySelector('.user-name');
const loginPass = document.querySelector('.user-password');
const loginBtn = document.querySelector('.user-login');

const filterBtn = document.querySelector('.filter-button');
const sortOption = document.querySelector('.sort-category');

const exitBtns = document.querySelectorAll('.div-exit');

// ----- OUTPUT ELEMENTS ----- //
const catalogSection = document.querySelector('.catalog-section');
const catalogMenu = document.querySelector('.catalog-menu');
const filterBar = document.querySelector('.filter-bar');
const displayWindow = document.querySelector('.display-window');
const shoeCards = document.querySelectorAll('.shoe-card');

const messageBox = document.querySelector('.message-box');

// ----- VARIABLES ----- //
let timeout = 250;
let divTimeout, msgTimeout;

// ==================== INITIALIZATION ==================== //

let catShoe = ShoeCatalog();

let sampleShoeMap = new Map([
	[1000, {
		'brand': "Under Armour",
		'model': "Assert 9",
		'type': "Running Shoe",
		'price': 999,
		'like': false,
		'sold': 9,
		'photos': {
			'index': 'Black-White',
			'Black-White': "./assets/images/shoes/ua-assert9-blackwhite.webp"
		},
		'sizeColorQuantity': {
			'6,Black-White': 13,
			'7,Black-White': 9,
			'8,Black-White': 7,
			'9,Black-White': 10
		}
	}],
	[1001, {
		'brand': "Under Armour",
		'model': "Micro G Valsetz",
		'type': "Tactical Boot",
		'price': 2899,
		'like': true,
		'sold': 2,
		'photos': {
			'index': 'Black',
			'Black': "./assets/images/shoes/ua-mircogvalsetz-black.webp",
			'Gold': "./assets/images/shoes/ua-mircogvalsetz-gold.webp"
		},
		'sizeColorQuantity': {
			'7,Black': 3,
			'7,Gold': 2,
			'8,Black': 6,
			'8,Gold': 3,
			'9,Black': 2,
			'10,Black': 5,
			'10,Gold': 1
		}
	}],
	[1002, {
		'brand': "Adidas",
		'model': "Breaknet 2.0",
		'type': "Sneaker",
		'price': 1099,
		'like': false,
		'sold': 11,
		'photos': {
			'index': 'Black-White',
			'Black-White': "./assets/images/shoes/adidas-breaknet2-blackwhite.avif",
			'White-Blue-Red': "./assets/images/shoes/adidas-breaknet2-white-bluered.avif"
		},
		'sizeColorQuantity': {
			'6,Black-White': 11,
			'6,White-Blue-Red': 5,
			'7,Black-White': 12,
			'7,White-Blue-Red': 11,
			'8,Black-White': 9,
			'8,White-Blue-Red': 4,
			'9,White-Blue-Red': 2
		}
	}],
	[1003, {
		'brand': "Nike",
		'model': "Air Max 90",
		'type': "Sneaker",
		'price': 2499,
		'like': false,
		'sold': 5,
		'photos': {
			'index': 'Black',
			'Black': "./assets/images/shoes/nike-airmax90-black.webp"
		},
		'sizeColorQuantity': {
			'4,Black': 1,
			'5,Black': 5,
			'6,Black': 4,
			'7,Black': 7,
			'8,Black': 5,
			'9,Black': 2,
			'10,Black': 4,
			'11,Black': 2
		}
	}],
	[1004, {
		'brand': "Nike",
		'model': "Gripknit Phantom GX",
		'type': "Soccer Boot",
		'price': 5799,
		'like': false,
		'sold': 0,
		'photos': {
			'index': 'Black-White',
			'Black-White': "./assets/images/shoes/nike-gripknit-phantom-gx-blackwhite.webp",
			'Black-Red': "./assets/images/shoes/nike-gripknit-phantom-gx-blackred.webp",
			'Green-Orange': "./assets/images/shoes/nike-gripknit-phantom-gx-greenorange.webp"
		},
		'sizeColorQuantity': {
			'6,Black-White': 1,
			'6,Black-Red': 1,
			'7,Black-White': 1,
			'7,Black-Red': 2,
			'7,Green-Orange': 2,
			'8,Black-White': 1,
			'8,Black-Red': 2,
			'8,Green-Orange': 2
		}
	}],
	[1005, {
		'brand': "New Balance",
		'model': "650",
		'type': "Sneaker",
		'price': 2899,
		'like': false,
		'sold': 18,
		'photos': {
			'index': 'White-Black',
			'White-Black': "./assets/images/shoes/nb-650-whiteblack.webp",
			'White-Blue': "./assets/images/shoes/nb-650-whiteblue.webp",
			'White-Red': "./assets/images/shoes/nb-650-whitered.webp"
		},
		'sizeColorQuantity': {
			'7,White-Black': 8,
			'7,White-Blue': 7,
			'7,White-Red': 1,
			'8,White-Blue': 2,
			'8,White-Blue': 2,
			'8,White-Red': 3,
			'9,White-Blue': 4,
			'9,White-Blue': 2,
			'9,White-Blue': 6,
			'10,White-Black': 2
		}
	}],
	[1006, {
		'brand': "New Balance",
		'model': "650 v2",
		'type': "Sneaker",
		'price': 2799,
		'like': false,
		'sold': 9,
		'photos': {
			'index': 'White-Black',
			'White-Black': "./assets/images/shoes/nb-650v2-whiteblack.webp",
			'White-Blue': "./assets/images/shoes/nb-650v2-whiteblue.webp",
			'White-Yellow': "./assets/images/shoes/nb-650v2-whiteyellow.webp",
			'Black-Red': "./assets/images/shoes/nb-650v2-blackred.webp"
		},
		'sizeColorQuantity': {
			'5,White-Black': 2,
			'5,White-Blue': 2,
			'5,Black-Red': 3,
			'6,White-Black': 5,
			'6,White-Blue': 6,
			'6,White-Yellow': 7,
			'6,Black-Red': 3,
			'7,White-Blue': 2,
			'7,Black-Red': 3,
			'8,White-Black': 2,
			'8,White-Blue': 3,
			'8,White-Yellow': 5,
			'8,Black-Red': 2,
			'9,White-Black': 7,
			'9,Black-Red': 6
		}
	}]
]);

let sampleFilters = {
	brands: ['Nike', 'Under Armour', 'Adidas'],
	types: ['Running Shoe', 'Tactical Boot', 'Sneaker', 'Soccer Boot'],
	colors: ['Black', 'Gold', 'White', 'Red', 'Green'],
	sizes: [4, 5, 6, 7, 8, 9, 10, 11]
};

initializeCatalog();
// updateLocalStorage();
updateNavMenu();
catShoe.setFilters();
updateFilterBar();
displayShoeCards();

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

function displayShoeCards() {
	const data = {
		shoes: []
	}
	const shoeMap = catShoe.getShoeMap();

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
			color: shoe.photos.index,
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

		if (Object.keys(shoe.photos).length < 3) {
			currShoe['transparent'] = 'transparent';
		}

		data.shoes.push(currShoe);
	}

	const shoeCardContents = shoeTemplate(data);
	displayWindow.innerHTML = shoeCardContents;
	setLikeBtnEvents();
	setNextBtnEvents();
}

function sortShoeCards() {
	catShoe.sortShoeMap(sortOption.options[sortOption.selectedIndex].value);
	updateLocalStorage();
	displayShoeCards();
}

function setLikeBtnEvents() {
	const likeBtns = document.querySelectorAll('.shoe-like');
	likeBtns.forEach(button => {
		button.addEventListener('click', () => {
			catShoe.toggleLike(Number(button.alt));
			updateLocalStorage();
			displayShoeCards();
		});
	});
}

function setNextBtnEvents() {
	const nextBtns = document.querySelectorAll('.shoe-next');
	nextBtns.forEach(button => {
		button.addEventListener('click', () => {
			catShoe.nextImg(Number(button.nextElementSibling.alt));
			updateLocalStorage();
			displayShoeCards();
		});
	});
}

function updateFilterBar() {
	const filters = catShoe.getFilters();
	const data = {
		user: catShoe.getCurrUser().charAt(0).toUpperCase() + catShoe.getCurrUser().slice(1),
		brands: filters.brands,
		types: filters.types,
		colors: filters.colors.map(color => color.charAt(0).toUpperCase() + color.slice(1)),
		sizes: filters.sizes
	}

	filterBar.innerHTML = filterTemplate(data);
	getFilterCheckedboxes();
}

function getFilterCheckedboxes() {
	const filterCheckboxes = document.querySelectorAll('.filter-checkbox input');
	filterCheckboxes.forEach(checkbox => {
		checkbox.addEventListener('change', () => {
			const brands = getCheckedValues('filter-brand');
			const types = getCheckedValues('filter-type');
			const sizes = getCheckedValues('filter-size');
			const colors = getCheckedValues('filter-color');
			const like = document.getElementById('Like').checked;

			const priceRange = { min: 0, max: Infinity };
			if (!isNaN(Number(document.querySelector('.filter-price-low').value))) {
				priceRange.min = Number(document.querySelector('.filter-price-low').value);
			}
			if (!isNaN(Number(document.querySelector('.filter-price-high').value))) {
				priceRange.min = Number(document.querySelector('.filter-price-high').value);
			}
			catShoe.setAppliedFilters(brands, types, priceRange, like, sizes, colors)
			displayShoeCards();
		});
	});
}

function getCheckedValues(filterCategory) {
	const checkedBoxes = document.querySelectorAll('.' + filterCategory + ' input[type="checkbox"]:checked');
	const values = [];
	checkedBoxes.forEach((checkbox) => {
		values.push(checkbox.value);
	});

	return values;
}

function addSearchFilter() {
	catShoe.setSearchFilter(navSearch.value);
	displayShoeCards();
}

// ==================== SHOPPING CART HANDLING ==================== //

// ==================== ADMIN USER HANDLING ==================== //

function showLoginForm() {
	showDiv(loginForm);
	loginForm.childNodes[9].focus();
}

function logUserIn() {
	if (loginName.value === '' || loginPass.value === '') {
		catShoe.setMessage("Fill in the form :|", "error");
	} else if (catShoe.checkUserPass(loginName.value, loginPass.value)) {
		catShoe.setCurrUser(loginName.value);
		catShoe.setMessage("You are logged in as<br>" + catShoe.getCurrUser(), "success");
		setTimeout(() => {
			loginForm.querySelector('.div-exit').click();
		}, timeout * 10);
	} else {
		catShoe.setMessage("Username or password is incorrect :(", "error");
	}
	updateNavMenu();
	showMessage();
}

function updateNavMenu() {
	if (catShoe.getCurrUser() === 'consumer') {
		navCartBtn.classList.remove('hidden');
		navAddBtn.classList.add('hidden');
	} else if (catShoe.getCurrUser() === 'admin') {
		navCartBtn.classList.add('hidden');
		navAddBtn.classList.remove('hidden');
	}
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

// ==================== LOCAL STORAGE ==================== //

function updateLocalStorage() {
	localStorage.setItem('shoeMap', JSON.stringify(Array.from(catShoe.getShoeMap().entries())));
	localStorage.setItem('shoeMapSortOrder', sortOption.options[sortOption.selectedIndex].value);
	localStorage.setItem('user', catShoe.getCurrUser());
}

function initializeCatalog() {
	if (localStorage.getItem('shoeMap')) {
		catShoe.setShoeMap(new Map(JSON.parse(localStorage.getItem('shoeMap'))));
	} else {
		catShoe.setShoeMap(sampleShoeMap);
	}

	if (localStorage.getItem('shoeMapSortOrder')) {
		sortOption.value = localStorage.getItem('shoeMapSortOrder');
	} else {
		sortOption.value = 'newest';
	}

	if (localStorage.getItem('user')) {
		catShoe.setCurrUser(localStorage.getItem('user'));
	} else {
		catShoe.setCurrUser('nicholas');
	}
}

// ==================== EVENT LISTENERS ==================== //

navUserBtn.addEventListener('click', showLoginForm);
navSearch.parentNode.addEventListener('click', expandSearch);
navSearch.parentNode.addEventListener('focusout', contractSearch);
navSearch.addEventListener('input', addSearchFilter);

filterBtn.addEventListener('click', toggleFilterBar);
sortOption.addEventListener('change', sortShoeCards);

loginName.addEventListener('keydown', (event) => {
	if (event.keyCode === 13) {
		loginPass.focus();
	}
});
loginPass.addEventListener('keydown', (event) => {
	if (event.keyCode === 13) {
		logUserIn();
	}
});
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