// $ function is loaded only once HTML has completely loaded

$(function () {

	var done = false;
    function setTotalCost() {
    	if (localStorage.getItem('total_cost') ) {
    		total_cost = +localStorage.getItem('total_cost');
    		$('#totalCost').text(total_cost);
    	}
    	else {
    		localStorage.setItem('total_cost', '0');
    		total_cost = +localStorage.getItem('total_cost');
    		$('#totalCost').text(total_cost);
    	}
    } // end of the function setTotalCost

    function setNoOfProducts() {
    	if (localStorage.getItem('no_of_products') ) {
    		no_of_products = +localStorage.getItem('no_of_products');
    		$('#noOfProducts').text(no_of_products);
    	}
    	else {
    		localStorage.setItem('no_of_products', '0');
    		no_of_products = +localStorage.getItem('no_of_products');
    		$('#noOfProducts').text(no_of_products);
    	}
    } // end of the function setNoOfProucts

    function updateCart() {
    	
    	no_of_products = +localStorage.getItem('no_of_products');
    	if (no_of_products) {
    		if (!done) {
    			console.log(no_of_products);		
    			var cart_head = $('#cartItemsHead');
    			var head_string = "<tr><th>Product Name</th><th>Quantity</th><th>Amount</th><tr>";
    			cart_head.append(head_string);
    			done = true;
    		}

    		// display using cart.append
    		var cart_body = $('#cartItemsBody');
    		cart_body.empty();
    		for(i=1;i<=3;i++)
    		{
    			if (localStorage.getItem('prod_'+i)) {
    				cartItem = JSON.parse(localStorage.getItem('prod_'+i));
    				var name = $('product[id=' + i + ']').text();
    				var cost = +$('cost[id=' + i + ']').text();
    				var amount = cost*cartItem.quantity;
    				var cartString = "<tr><td>"+name+"</td><td>"+cartItem.quantity+"</td><td>"+amount+"</td></tr>"
    				cart_body.append(cartString);
    			}
    		}
    	}
    	else
    	{
    		var cart_head = $('#cartItemsHead');
    		cart_head.empty(); // to remove the child elements
    	}

    } // end of the function updateCart

    function cartRefresh() { // every time the page is loaded, the card is refreshed

    	setTotalCost(); // call of the function setTotalCost
    	setNoOfProducts(); // call of the function setNoOfProducts
    	updateCart(); // call of the function updateCart

    } // end of the function cartRefresh

    function init() {

    	for (var i = 1; i <= 3 ; i++) {
    		$('quantity[id=' + i +']').text(1);
    	}
    	cartRefresh(); // call of the function cartRefresh

    } // end of the function init

    init(); // call of the function init

    function reset() {
    	localStorage.setItem('no_of_products', 0);
    	no_of_products = +localStorage.getItem('no_of_products');
    	$('#totalCost').text(no_of_products);
    	localStorage.setItem('total_cost', 0);
    	total_cost = +localStorage.getItem('total_cost');
    	$('#noOfProducts').text(total_cost);
    	for (var i = 1; i <= 3 ; i++) {
    		$('quantity[id=' + i +']').text(1);
    	}
    	var cart_head = $('#cartItemsHead');
    	cart_head.empty(); // to remove the child elements
    	var cart_body = $('#cartItemsBody');
    	cart_body.empty(); // to remove the child elements
    	done = false;
    } // end of the function reset

    function qtyDecrement(qty_id) {
    	if (($('quantity[id=' + qty_id + ']').text())>1) { // Quantity can't be lesser than 1
    		var x = +$('quantity[id=' + qty_id + ']').text();
    	$('quantity[id=' + qty_id + ']').text(--x);	
    	}
    } // end of the function qtyDecrement

    function qtyIncrement(qty_id) {
    	var x = +$('quantity[id=' + qty_id + ']').text();
    	$('quantity[id=' + qty_id + ']').text(++x);
    } // end of the function qtyIncrement

    $("button").click(function() { // button click function

    	// alert(this.id + ':' +this.name);
    	if (this.name == "minus") { // if '-' button is clicked
    		qtyDecrement(this.id); // decrease quantity by 1
    	}
    	if (this.name == "plus") { // if '-' button is clicked
    		qtyIncrement(this.id); // increase quantity by 1
    	}
    	if (this.name == "add-to-cart") {
    		var qty = +$('quantity[id=' + this.id + ']').text();
    		var cost = +$('cost[id=' + this.id + ']').text();
    		// add to cart (local)
    		if (localStorage.getItem('prod_'+this.id)) {
	    		cartItem = JSON.parse(localStorage.getItem('prod_'+this.id));
	    		newcartItem = {
	    			'id': this.id,
	    			'quantity': (qty+cartItem.quantity)
	    		};
	    		localStorage.removeItem('prod_'+this.id)
	    		localStorage.setItem('prod_' + this.id, JSON.stringify(newcartItem));
	    	}
	    	else {
	    		newcartItem = {
	    			'id': this.id,
	    			'quantity': qty
	    		};
	    		localStorage.setItem('prod_' + this.id, JSON.stringify(newcartItem));	
	    	}

    		// add number of products
    		if (localStorage.getItem('no_of_products')) {
    			no_of_products = +(localStorage.getItem('no_of_products'));
    			localStorage.removeItem('no_of_products');
    			localStorage.setItem('no_of_products', (no_of_products+qty).toString());
    		}
    		else {
    			localStorage.setItem('no_of_products', (qty).toString());	
    		}

    		// add total cost
			if (localStorage.getItem('total_cost')) {
    			total_cost = +(localStorage.getItem('total_cost'));
    			localStorage.removeItem('total_cost');
    			localStorage.setItem('total_cost', (total_cost+(cost*qty)).toString());
    		}
    		else {
    			localStorage.setItem('no_of_products', (cost*qty).toString());	
    		}    		

    		cartRefresh(); // call of the function cartRefresh
    		$('quantity[id=' + this.id + ']').text(1);
    	}
    	
    	if (this.name == "clear-cart") {
    		reset(); // call of the function reset
    		for (var i = 3; i >= 1; i--) {
    			localStorage.removeItem('prod_' + i);
    		}
    	}

	});
    
});
