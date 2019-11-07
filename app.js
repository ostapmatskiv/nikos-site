skrollr.init();

// Отримати всі посилання які відкривають корзину за класом open-cart
var cartBtn = document.getElementsByClassName('open-cart');
for (var i = 0; i < cartBtn.length; i++) {
	cartBtn[i].onclick = openCart; //кожному елементу присвоїти ф-цію openCart
}
// Отримати всі кнопки які є в section.rooms article
var buyBtn = document.querySelectorAll('section.rooms article button');
for (var i = 0; i < buyBtn.length; i++) {
	buyBtn[i].onclick = addProductToCart; //кожному елементу присвоїти ф-цію openCart
}
//іконці "хрестик" в корзині присвоїти подію "Закрити корзину"
document.querySelector('#cart div > i.fa-times-circle').onclick = closeCart;

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
	td4.innerText = '1'; // клітинці 4 задаємо текст
	tr.appendChild(td4); // додаємо клітинку до рядка

	var td5 = document.createElement('td'); // створюємо 5-у клітинку
	td5.innerText = price; // клітинці 5 задаємо текст "$50000"
	tr.appendChild(td5); // додаємо клітинку до рядка

	var td6 = document.createElement('td'); // створюємо 6-у клітинку
	td6.innerHTML = '<button>x</button>'; // клітинці 6 задаємо кнопку
	tr.appendChild(td6); // додаємо клітинку до рядка

	var table = cart.querySelector('table tbody'); // знаходимо тіло таблиці у cart
	table.appendChild(tr); // додаємо до таблиці новостворений рядок
	
	openCart (); // виводимо корзину
}