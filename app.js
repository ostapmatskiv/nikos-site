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
function addProductToCart() {
	openCart ();
}