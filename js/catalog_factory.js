function ShoeCatalog() {
	// variable for shoe catalog list
	let shoeList = {};
	// variable for shopping cart

	// variable to store messages
	let message = {
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
			'photos': photos,
			'sizeColorQuantity': sizeColorQuantity,
		};

		shoeList[generateShoeID()] = shoe;
	}

	function toggleLike(id) {
		shoeList[id].like = !shoeList[id].like;
	}

	// function compileQuantities() {
	// 	let sizeColorQuantity;
	// 	return sizeColorQuantity;
	// }

	function generateShoeID() {
		const shoeIDList = Object.keys(shoeList);
		if (shoeIDList.length > 0) {
			return parseInt(shoeIDList[shoeIDList.length - 1]) + 1;
		}
		return 1000;
	}

	// function to remove shoe from catalog

	// function to set entire catalog list
	function setShoeList(list) {
		shoeList = list;
	}

	function getShoeList() {
		return shoeList;
	}

	// function to add shoe to shopping cart

	// function to remove shoe from shopping cart

	// function to set entire shopping cart

	// function to clear shopping cart

	// function to get specific shoe

	// function to filter shoe list

	// function to sort shoe list

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
		setShoeList,
		getShoeList,
		setMessage,
		getMessage,
	}
}