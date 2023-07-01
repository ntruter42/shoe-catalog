function ShoeCatalog() {
	// variable for shoe catalog list
	let shoeMap = new Map();
	let filters = {
		brands: [],
		types: [],
		priceRange: { min: 0, max: Infinity },
		like: undefined
	};

	// variable for shopping cart

	// variable to store messages
	const message = {
		'text': '',
		'type': '',
	};

	// function to add shoe to catalog
	function addShoe(brand, model, type, price, photos, sizeColorQuantity) {
		const shoe = {
			'brand': brand,
			'model': model,
			'type': type,
			'price': price,
			'like': false,
			'sold': 0,
			'photos': photos,
			'sizeColorQuantity': sizeColorQuantity,
		};
		shoeMap.set(generateShoeID(), shoe);
	}

	function toggleLike(id) {
		shoeMap.get(id).like = !shoeMap.get(id).like;
	}

	// function compileQuantities() {
	// 	let sizeColorQuantity;
	// 	return sizeColorQuantity;
	// }

	function generateShoeID() {
		let lastID = 999;
		for (let id of shoeMap.keys()) {
			if (id > lastID) {
				lastID = id;
			}
		}
		return lastID + 1;
	}

	// function to remove shoe from catalog

	// function to set entire catalog list
	function setShoeMap(map) {
		shoeMap = map;
	}

	function getShoeMap() {
		const filteredShoeMap = new Map();

		for (const [id, shoe] of shoeMap) {
			let includeShoe = true;

			if (filters.brands && filters.brands.length > 0 && !filters.brands.includes(shoe.brand)) {
				includeShoe = false;
			}
			if (filters.types && filters.types.length > 0 && !filters.types.includes(shoe.type)) {
				includeShoe = false;
			}
			if (filters.price && (shoe.price < filters.priceRange.min || shoe.price > filters.priceRange.max)) {
				includeShoe = false;
			}
			if (filters.like !== undefined && shoe.like !== filters.like) {
				includeShoe = false;
			}

			if (includeShoe) {
				filteredShoeMap.set(id, shoe);
			}
		}

		return filteredShoeMap;
	}

	// function to add shoe to shopping cart

	// function to remove shoe from shopping cart

	// function to set entire shopping cart

	// function to clear shopping cart

	// function to get specific shoe

	// function to filter shoe list
	function setFilters(brands, types, priceRange, like) {
		filters.brands = brands;
		filters.types = types;
		filters.priceRange = priceRange;
		filters.like = like;
	}

	// function to sort shoe list
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

	// functions to handle messages
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

	// return functions
	return {
		addShoe,
		toggleLike,
		generateShoeID,
		setShoeMap,
		getShoeMap,
		sortShoeMap,
		setMessage,
		getMessage,
	}
}