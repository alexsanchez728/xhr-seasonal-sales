// Initialize the 2 arrays that the JSON arrays will be put into
var products = [];
var categories = [];
var seasonSelect = document.getElementById("season-select");
var discountsButton = document.getElementById("showDiscounts");
// var isDiscounted = false;
// var priceEl = "";
// var priceTextNode = "";

function domString(crap) {
	var domString = "";
	for (var i = 0; i < crap.length; i++){
		domString += 	`<div class="productItem">`;
		domString += 		`<h1>${crap[i].name}</h1>`;
		domString += 		`<h5>Department: ${crap[i].categoryName}</h5>`;
		domString += 		`<h3>&#36;${crap[i].price}</h3>`;
		domString +=  `</div>`
	}
	writeToDom(domString);
}
function writeToDom(strang) {
	var prodContainer = document.getElementById("product-container");
	prodContainer.innerHTML += strang;
}
discountsButton.addEventListener("click", function(){
	var chosenSeason = seasonSelect.value;
	if(chosenSeason === "winter"){
	// console.log("Winter numbers", chosenSeason);
		for (var i = 0; i < products.length; i++){
			if (products[i].categorySeason === "Winter"){
				isDiscounted = true;
				var winterDiscount = calculateDiscount(products[i].price, products[i].discount);
				// console.log(winterDiscount);
				// priceEl = document.createElement(`h3`);
				// priceTextNode = document.createTextNode(`Your discount! &#36;${winterDiscount}`);
				// priceEl.appendChild(priceTextNode);
				// console.log(priceEl);

			}
		}
	}
	if(chosenSeason === "autumn"){
		console.log("Autumn numbers", chosenSeason);
		for (var i = 0; i < products.length; i++){
			if (products[i].categorySeason === "Autumn"){
				console.log(calculateDiscount(products[i].price, products[i].discount));
			}
		}
	}
	if(chosenSeason === "spring"){
		console.log("Spring numbers", chosenSeason);
		for (var i = 0; i < products.length; i++){
			if (products[i].categorySeason === "Spring"){
				console.log(calculateDiscount(products[i].price, products[i].discount));
			}
		}
	}
});

//discount function
function calculateDiscount(itemPrice, seasonDiscount) {
	itemPrice = itemPrice * 100;
	var discount = itemPrice * seasonDiscount;
	itemPrice = (itemPrice - discount) / 100;
	itemPrice = itemPrice.toFixed(2);
	return itemPrice;
}
// Step 2
function executeThisCodeAfterFileLoads() {
	var productsData = JSON.parse(this.responseText).products;
	// after the first request loads, send the request for the second
	getCategories(productsData);
}

function executeThisCodeIfFileErrors () {
	console.log("shits broke yo");
}

//Step 1
//transfering data from json file to js file
var myRequestForProducts = new XMLHttpRequest();
myRequestForProducts.addEventListener("load", executeThisCodeAfterFileLoads);
myRequestForProducts.addEventListener("error", executeThisCodeIfFileErrors);
myRequestForProducts.open("GET", "products.json");
myRequestForProducts.send();

// Step 3
function getCategories(products){
	var myRequestForCategories = new XMLHttpRequest();
	myRequestForCategories.addEventListener("load", executeThisCodeAfterFileLoads2);
	myRequestForCategories.addEventListener("error", executeThisCodeIfFileErrors);
	myRequestForCategories.open("GET", "categories.json");	
	myRequestForCategories.send();


	// step 4
	function executeThisCodeAfterFileLoads2() {
		var categoriesData = JSON.parse(this.responseText).categories;
		//step 5
		// Only after both requests complete wil anything else happen
		combinedArray(products, categoriesData)
	}
}
//step 6, congrats we got both arrays in one place
// ... and combined them into productsArray
// ... and sent it to domString function
function combinedArray(productsArray, categoriesArray) {
	console.log("products from combined array", productsArray);
	console.log("cats from combined array", categoriesArray);
	// loop through products and look at category_id
	productsArray.forEach(function(product){
		var currentProductId = product["category_id"];
		// Step 7, looping through both ...
		categoriesArray.forEach(function(category){
			if (currentProductId === category.id){

			// Step 8 ... to add new key value pairs from breeds
			product.categoryName = category.name;
			product.categorySeason = category["season_discount"]
			product.discount = category.discount;
			}
		})
	});
			console.log("all products", productsArray);
			// Step 9
			domString(productsArray);
}
			console.log("all products", productsArray);
