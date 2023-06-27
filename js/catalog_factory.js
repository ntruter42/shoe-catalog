function ShoeCatalog() {
	// variable for shoe catalog list
	let shoeList = {};
	// variable for shopping cart

	// function to add shoe to catalog
	function addShoe(brand, model, type, price, photo, sizeColorQuantity) {
		const shoe = {
			'brand': brand,
			'model': model,
			'type': type,
			'price': price,
			'photo': photo,
			'sizeColorQuantity': sizeColorQuantity,
		};

		shoeList[generateShoeID()] = shoe;
	}

	function generateShoeID() {
		const shoeIDList = Object.keys(shoeList);
		if (shoeIDList.length > 0) {
			return parseInt(shoeIDList[shoeIDList.length - 1]) + 1;
		}
		return 1000;
	}

	// function to remove shoe from catalog

	// function to set entire catalog list

	// function to add shoe to shopping cart

	// function to remove shoe from shopping cart

	// function to set entire shopping cart

	// function to clear shopping cart

	// function to get specific shoe

	// function to filter shoe list

	// function to sort shoe list

	// return functions
	return {
		addShoe,
		generateShoeID,
	}
}