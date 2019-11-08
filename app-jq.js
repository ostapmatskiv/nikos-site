$(function () {
	$('#loadnig').fadeOut(1500, function() {
    	$('body').css('overflowY', 'auto');
  	});
});

$('.open-cart').click( openCart );
$('.open-video').click(function () {
	$('#video').css('display', 'flex').hide().fadeIn(1000);
	$('body').css('overflowY', 'hidden');
});

video.onclick = function () {
	if(event.target.id == 'video')
	{
		$('#video').slideUp();
		$('body').css('overflowY', 'auto');
	}
};

//іконці "хрестик" в корзині присвоїти подію "Закрити корзину"
$('#cart div > i.fa-times-circle').click(closeCart);
cart.onclick = function () {
	if(event.target.id == 'cart')
		$('#cart').hide();
};

function openCart () {
	event.preventDefault();
	$('#cart').css('display', 'flex');
}
function closeCart () {
	$('#cart').hide();
}

var nextI = 1;
$('section.rooms article button').click(function () {
	var price = $(this).prev().text();
	var name = $(this).parent().find('h3').text();

	var tr = $('<tr/>'); // стаорюємо рядок

	$('<td/>').text(nextI++).appendTo(tr);
	// створюємо 1-у клітинку; клітинці 1 задаємо текст nextI; додаємо клітинку до рядка

	$('<td/>', { text: name }).appendTo(tr); // створюємо 2-у клітинку, клітинці 2 задаємо текст name; додаємо клітинку до рядка

	$('<td/>').text(price).appendTo(tr);

	var input = $('<input/>', {
		type: 'number',
		min: 1,
		value: 1,
		change: setProductSum
	}); 
	$('<td/>').append(input).appendTo(tr);

	$('<td/>').text(price).appendTo(tr);

	var td6 = $('<td/>').appendTo(tr); // створюємо 6-у клітинку
	$('<button/>', {
		text: 'x',
		click: deleteProduct
	}).appendTo(td6);

	$('#cart table tbody').append(tr); // додаємо до таблиці новостворений рядок
	
	recalcCart();
	openCart (); // виводимо корзину
});

function deleteProduct() {
	$(this).closest('tr').remove();
	nextI--;
	recalcCart();
}

function setProductSum() {
	var amount = $(this).val();
	var price = $(this).parent().prev().text();
	var firstSymbol = price.substr(0, 1); // отримуємо перший символ
	if(firstSymbol == '$') // перевіряємо чи перший символ є доларом
		price = price.substr(1); // обрізаємо долар (перший символ у ціні)
	price = parseInt(price); // перетворюємо текст на число
	var sum = amount * price;
	$(this).parent().next().text('$' + sum);
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