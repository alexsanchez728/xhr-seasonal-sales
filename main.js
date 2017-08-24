// Initialize the 2 arrays that the JSON arrays will be put into
var products = [];
var categories = [];

	function domString(crap) {
	var domString = "";
	for (var i = 0; i < crap.length; i++){
		domString += 	`<div class="productItem">`
		domString += 		`<h1>${crap[i].name}</h1>`
		domString += 		`<h3>${crap[i].price}</h3>`
		domString += 		`<h5>${crap[i].color}</h5>`
		domString += 	`</div>`
	}
		writeToDom(domString);
}

function writeToDom(strang) {
	var catContainer = document.getElementById("kat-koral");
	catContainer.innerHTML += strang;
}

function addDepartmentToProducts(){
	for (var i = 0; i < products.length; i++) {
		for (var j = 0; j < deparments.length; j++) {
			if (deparments[i].id === products[i]["category_id"]){
				products[i].categoryName = department[i].name;
				products[i].categorySeason = deparment[i][""]
			}
		}
	}
}

function moveOn() {
	addDepartmentToProducts();
}
// Transfering JSON products array into js array 'products'
function executeThisCodeAfterFileLoads() {
	var data = JSON.parse(this.responseText);
	products = data.products;
	myRequestForCategories.send();
}
// Transfering JSON categories array into js array 'categories'
function executeThisCodeAfterFileLoads2() {
	var data = JSON.parse(this.responseText);
	categories = data.categories;
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



