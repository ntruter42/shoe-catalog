function ShoeCatalog() {
	let shoeMap = new Map();

	let filters = {
		brands: [],
		types: [],
		sizes: [],
		colors: [],
		priceRange: { min: 0, max: Infinity },
		search: ''
	};
	let appliedFilters = {
		brands: [],
		types: [],
		sizes: [],
		colors: [],
		like: false,
		priceRange: { min: 0, max: Infinity },
		search: ''
	};

	let users = {};
	let currUser = 'admin';

	// variable for shopping cart
	// const cart = [];

	const message = {
		'text': '',
		'type': ''
	};

	function addShoe(brand, model, type, price, photos, sizeColorQuantity) {
		const shoe = {
			'brand': brand,
			'model': model,
			'type': type,
			'price': price,
			'sold': 0,
			'photos': photos,
			'sizeColorQuantity': sizeColorQuantity
		};
		shoeMap.set(generateShoeID(), shoe);
	}

	function toggleLike(shoeID) {
		const shoe = shoeMap.get(shoeID);

		if (!getCurrUser().likes.includes(shoeID)) {
			getCurrUser().likes.push(shoeID);
		} else {
			getCurrUser().likes.splice(getCurrUser().likes.indexOf(shoeID), 1);
		}
	}

	function nextImg(shoeID) {
		const shoe = shoeMap.get(shoeID);
		const colors = Object.keys(shoe.photos);
		const currIndex = colors.indexOf(shoe.photos.index);
		const nextIndex = colors[((currIndex) % (colors.length - 1)) + 1];

		shoe.photos.index = nextIndex;
	}

	function generateShoeID() {
		let lastID = 999;
		for (const id of shoeMap.keys()) {
			if (id > lastID) {
				lastID = id;
			}
		}
		return lastID + 1;
	}

	function setShoeMap(map) {
		shoeMap = map;
	}

	function getShoeMap() {
		const filteredShoeMap = new Map();

		for (const [id, shoe] of shoeMap) {
			let includeShoe = true;

			if (appliedFilters.brands && appliedFilters.brands.length > 0 && !appliedFilters.brands.includes(shoe.brand)) {
				includeShoe = false;
			}

			if (appliedFilters.types && appliedFilters.types.length > 0 && !appliedFilters.types.includes(shoe.type)) {
				includeShoe = false;
			}

			if (appliedFilters.priceRange && (shoe.price < appliedFilters.priceRange.min || shoe.price > appliedFilters.priceRange.max)) {
				includeShoe = false;
			}

			// if (appliedFilters.like) {
			// 	includeShoe = false;
			// }

			const shoeSizes = Object.keys(shoe.sizeColorQuantity).map(sizeColor => sizeColor.split(',')[0]);
			if (appliedFilters.sizes && appliedFilters.sizes.length > 0) {
				let sizeMatch = false;
				for (const size of appliedFilters.sizes) {
					if (shoeSizes.includes(size)) {
						sizeMatch = true;
						break;
					}
				}
				if (!sizeMatch) {
					includeShoe = false;
				}
			}

			const shoeColors = Object.keys(shoe.sizeColorQuantity).map(sizeColor => sizeColor.split(',')[1]);
			if (appliedFilters.colors && appliedFilters.colors.length > 0) {
				let colorMatch = false;
				for (const color of appliedFilters.colors) {
					if (shoeColors.includes(color)) {
						colorMatch = true;
						break;
					}
				}
				if (!colorMatch) {
					includeShoe = false;
				}
			}

			if (appliedFilters.search !== '') {
				const searchTerms = appliedFilters.search.toLowerCase().split(' ');
				const shoeTerms = [shoe.brand, shoe.model, shoe.type];
				const cleanShoeTerms = shoeTerms.concat(shoeColors).concat(shoeSizes).join(' ').toLowerCase();
				console.log(cleanShoeTerms);
				for (const word of searchTerms) {
					console.log(word);
					if (!cleanShoeTerms.includes(word)) {
						includeShoe = false;
					}
				}
			}

			if (includeShoe) {
				filteredShoeMap.set(id, JSON.parse(JSON.stringify(shoe)));
			}
		}

		return filteredShoeMap;
	}

	// function to add shoe to shopping cart
	// function to remove shoe from shopping cart
	// function to set entire shopping cart
	// function to clear shopping cart
	// function to get specific shoe

	function setFilters() {
		for (const [, shoe] of shoeMap) {
			if (!filters.brands.includes(shoe.brand)) {
				filters.brands.push(shoe.brand);
			}

			if (!filters.types.includes(shoe.type)) {
				filters.types.push(shoe.type);
			}

			if (shoe.price < filters.priceRange.min) {
				filters.priceRange.min = price;
			}

			if (shoe.price > filters.priceRange.max) {
				filters.priceRange.max = price;
			}

			const sizeColors = Object.keys(shoe.sizeColorQuantity);
			for (const sizeColor of sizeColors) {
				const [size, color] = sizeColor.split(',');
				if (!filters.sizes.includes(Number(size))) {
					filters.sizes.push(Number(size));
				}
				filters.sizes.sort((a, b) => a - b);
				if (!filters.colors.includes(color)) {
					filters.colors.push(color);
				}
			}
		}
	}

	function getFilters() {
		return filters;
	}

	function setAppliedFilters(brands, types, priceRange, like, sizes, colors) {
		appliedFilters.brands = brands;
		appliedFilters.types = types;
		appliedFilters.priceRange = priceRange;
		appliedFilters.like = like;
		appliedFilters.sizes = sizes;
		appliedFilters.colors = colors;
	}

	function setSearchFilter(input) {
		appliedFilters.search = input.toLowerCase();
	}

	function setPriceFilter(low, high) {
		if (low !== '' && !isNaN(low)) {
			appliedFilters.priceRange.min = low;
		} else {
			appliedFilters.priceRange.min = 0;
		}
		if (high !== '' && !isNaN(high)) {
			appliedFilters.priceRange.max = high;
		} else {
			appliedFilters.priceRange.max = Infinity;
		}
	}

	function sortShoeMap(order) {
		const shoeArray = Array.from(shoeMap);

		shoeArray.sort((a, b) => {
			switch (order) {
				case 'newest':
					return a[0] - b[0];
				case 'popular':
					return b[1].sold - a[1].sold;
				case 'low-high':
					return a[1].price - b[1].price;
				case 'high-low':
					return b[1].price - a[1].price;
			}
		});

		const sortedShoeMap = new Map(shoeArray);
		shoeMap = sortedShoeMap;
	}

	function checkUserPass(username, password) {
		return users[username].password === password;
	}

	function setUsers(userList) {
		users = userList;
	}

	function getUsers() {
		return users;
	}

	function setCurrUser(username) {
		currUser = username;
	}

	function getCurrUser() {
		return users[currUser];
	}

	function setMessage(text, type) {
		message.text = text;
		message.type = type;
	}

	function getMessage() {
		let retrievedMessage = JSON.parse(JSON.stringify(message));
		message.text = '';
		message.type = '';
		return retrievedMessage;
	}

	return {
		addShoe,
		toggleLike,
		nextImg,
		generateShoeID,
		setShoeMap,
		getShoeMap,
		sortShoeMap,
		setFilters,
		getFilters,
		setAppliedFilters,
		setSearchFilter,
		setPriceFilter,
		checkUserPass,
		setUsers,
		getUsers,
		setCurrUser,
		getCurrUser,
		setMessage,
		getMessage,
	}
}