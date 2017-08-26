// Initialize the 2 arrays that the JSON arrays will be put into
var products = [];
var categories = [];
var seasonSelect = document.getElementById("season-select");
var discountsButton = document.getElementById("showDiscounts");
// whichever option is selected is returned as an index

function domString(crap) {
	var domString = "";
	for (var i = 0; i < crap.length; i++){
		domString += 	`<div class="productItem">`;
		domString += 		`<h1>${crap[i].name}</h1>`;
		domString += 		`<h5>Department: ${crap[i].categoryName}</h5>`;
		domString += 		`<h3>&#36;${crap[i].price}</h3>`;

	writeToDom(domString);
}

calculateDiscount(9.99);
discountsButton.addEventListener("click", function(){
	var chosenSeason = seasonSelect.value;
	console.log(chosenSeason);
	if(chosenSeason === "winter"){
		for (var i = 0; i < products.length; i++){
			if (products[i].categoryName === "winter"){
				calculateDiscount(products[i].price, products[i].discount);
			}
		}
	}
})
//discount functions
function calculateDiscount(itemPrice, seasonDiscount) {
	itemPrice = itemPrice * 100;
	var discount = itemPrice * seasonDiscount;
	itemPrice = (itemPrice - discount) / 100;
	itemPrice = itemPrice.toFixed(2);
	console.log(itemPrice);
}

//winter

//autumn

//spring


function moveOn() {
	addDepartmentToProducts();
	domString(products);
	console.log(products);
}
function writeToDom(strang) {
	var prodContainer = document.getElementById("product-container");
	prodContainer.innerHTML += strang;
}
// Function to add relevant data from "catagories" to "products"
function addDepartmentToProducts(){
	// Run throguh each product...
	for (var i = 0; i < products.length; i++) {
		//... And while in each product loop through the categories array ...
		for (var j = 0; j < categories.length; j++) {
			// ... To compare the ids between the two arrays because if they match up ...
			if (products[i]["category_id"] === categories[j]["id"]){
				// ... Give the product the corresponding deparment name, season discount, and discount.
				products[i].categoryName = categories[j].name;
				products[i].categorySeason = categories[j]["season_discount"]
				products[i].discount = categories[j].discount;
			}
		}
	}
}
// Transfering JSON products array into js array 'products'
function executeThisCodeAfterFileLoads() {
	var data = JSON.parse(this.responseText);
	products = data.products;
	// after the first request loads, send the request for the second
	myRequestForCategories.send();
}
// Transfering JSON categories array into js array 'categories'
function executeThisCodeAfterFileLoads2() {
	var data = JSON.parse(this.responseText);
	categories = data.categories;
	// Only after both requests complete wil anything else happen
	moveOn();
}
function executeThisCodeIfFileErrors () {
	console.log("shits broke yo");
}
//transfering data from json file to js file
var myRequestForProducts = new XMLHttpRequest();
myRequestForProducts.addEventListener("load", executeThisCodeAfterFileLoads);
myRequestForProducts.addEventListener("error", executeThisCodeIfFileErrors);
myRequestForProducts.open("GET", "products.json");
myRequestForProducts.send();

var myRequestForCategories = new XMLHttpRequest();
myRequestForCategories.addEventListener("load", executeThisCodeAfterFileLoads2);
myRequestForCategories.addEventListener("error", executeThisCodeIfFileErrors);
myRequestForCategories.open("GET", "categories.json");