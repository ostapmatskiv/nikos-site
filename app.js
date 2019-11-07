// skrollr.init();

// Отримати всі посилання які відкривають корзину за класом open-cart
var cartBtn = document.getElementsByClassName('open-cart');
for (var i = 0; i < cartBtn.length; i++) {
	cartBtn[i].onclick = openCart; //кожному елементу присвоїти ф-цію openCart
}
// Отримати всі посилання які відкривають корзину за класом open-cart
var videoBtn = document.getElementsByClassName('open-video');
for (var i = 0; i < videoBtn.length; i++) {
	videoBtn[i].onclick = function () {
		video.style.display = 'flex';
		document.body.style.overflowY = 'hidden';
	}
}
video.onclick = function () {
	if(event.target.id == 'video')
	{
		video.style.display = 'none';
		document.body.style.overflowY = 'auto';
	}
};

// Отримати всі кнопки які є в section.rooms article
var buyBtn = document.querySelectorAll('section.rooms article button');
for (var i = 0; i < buyBtn.length; i++) {
	buyBtn[i].onclick = addProductToCart; //кожному елементу присвоїти ф-цію openCart
}
//іконці "хрестик" в корзині присвоїти подію "Закрити корзину"
document.querySelector('#cart div > i.fa-times-circle').onclick = closeCart;
cart.onclick = function () {
	if(event.target.id == 'cart')
		cart.style.display = 'none';
};

function openCart () {
	event.preventDefault();
	cart.style.display = 'flex';
}
function closeCart () {
	cart.style.display = 'none';
}

var nextI = 1;
function addProductToCart() {
	var price = this.previousElementSibling.innerText;
	var name = this.parentElement.firstElementChild.innerText;

	var tr = document.createElement('tr'); // стаорюємо рядок

	var td1 = document.createElement('td'); // створюємо 1-у клітинку
	td1.innerText = nextI++; // клітинці 1 задаємо текст nextI
	tr.appendChild(td1); // додаємо клітинку до рядка

	var td2 = document.createElement('td'); // створюємо 2-у клітинку
	td2.innerText = name; // клітинці 2 задаємо текст name
	tr.appendChild(td2); // додаємо клітинку до рядка

	var td3 = document.createElement('td'); // створюємо 3-у клітинку
	td3.innerText = price; // клітинці 3 задаємо текст
	tr.appendChild(td3); // додаємо клітинку до рядка

	var td4 = document.createElement('td'); // створюємо 4-у клітинку
	var input = document.createElement('input'); // створюємо 4-у клітинку
	input.type = 'number';
	input.min = 1;
	input.value = 1;
	input.onchange = setProductSum;
	td4.appendChild(input); // додаємо клітинку до рядка
	tr.appendChild(td4); // додаємо клітинку до рядка

	// td5
	tr.appendChild(td3.cloneNode(true)); // додаємо клона (копію) td3 клітинку до рядка

	var td6 = document.createElement('td'); // створюємо 6-у клітинку
	var button = document.createElement('button'); // створюємо button
	button.innerText = 'x';
	button.onclick = deleteProduct;
	td6.appendChild(button); // додаємо button до клітинк
	tr.appendChild(td6); // додаємо клітинку до рядка

	var table = cart.querySelector('table tbody'); // знаходимо тіло таблиці у cart
	table.appendChild(tr); // додаємо до таблиці новостворений рядок
	
	recalcCart();
	openCart (); // виводимо корзину
}

function deleteProduct() {
	var tr = this.closest('tr');
	var tbody = this.closest('tbody');
	tbody.removeChild(tr);
	nextI--;
	recalcCart();
}

function setProductSum() {
	var amount = this.value;
	var price = this.parentElement.previousElementSibling.innerText;
	var firstSymbol = price.substr(0, 1); // отримуємо перший символ
	if(firstSymbol == '$') // перевіряємо чи перший символ є доларом
		price = price.substr(1); // обрізаємо долар (перший символ у ціні)
	price = parseInt(price); // перетворюємо текст на число
	var sum = amount * price;
	this.parentElement.nextElementSibling.innerText = '$' + sum;
	recalcCart();
}

function recalcCart() {
	var td = cart.querySelectorAll('tbody tr td:first-child');
	for (var i = 0; i < td.length; i++) {
		td[i].innerText = i + 1;
	}

	var allSum = 0;
	var td = cart.querySelectorAll('tbody tr td:nth-child(5)');
	for (var i = 0; i < td.length; i++) {
		var price = td[i].innerText;
		var firstSymbol = price.substr(0, 1); // отримуємо перший символ
		if(firstSymbol == '$') // перевіряємо чи перший символ є доларом
			price = price.substr(1); // обрізаємо долар (перший символ у ціні)
		price = parseInt(price); // перетворюємо текст на число
		allSum += price;
	}
	cart.querySelector('tfoot td:first-child').innerText = '$' + allSum;
}