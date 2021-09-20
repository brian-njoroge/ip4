$(document).ready(function () {
    $("form#pizzacooking").submit(function (event) {
      event.preventDefault();

      let size, crust, toppings, count;
      size = $("#pizzaSize :selected");
      crust = $("#pizzaCrust :selected");
      toppings = $("#pizzaToppings :checked");
      count = parseInt($("#pizzaToppings :checked").val());

      let pizzaOrder = new PizzaOrder(size, crust, toppings, count);
      addToCart(pizzaOrder);
    
    // Display checkout button after placing order
    $("#checkoutBtn").click(function() {
      var delivery = $("#delivery :checked").val();
      var location = $("#deliveryLocation").val()
      var fullCharge = parseInt($("#total-charge").val());

      if(delivery === "deliver") {
        alert ("Thank you for buying at Ruby Pizzaria. Your total charge is"+(fullCharge +500)+" Your delivery is on the way to "+ location);
      }else {
        alert("Thank you for buying at Ruby Pizzaria. Your total charge is  " +fullCharge);
      }
    });

    $("#pick-up").click(function() {
      $("#deliveryLocation").hide();
    });
    $("#sdeliver").click(function() {
      $("#deliveryLocation").show();
    });
  });

    function PizzaOrder(pizzaSize, pizzaCrust, pizzaToppings, pizzaCount) {
      this.size = pizzaSize;
      this.crust = pizzaCrust;
      this.toppings = pizzaToppings; // an array
      this.count = pizzaCount;
  }

  PizzaOrder.prototype.getPrice = function () {
    let sizePrice, crustPrice, toppingsPrice;
    sizePrice = parseInt(this.size.val());
    crustPrice = parseInt(this.crust.val());
    toppingsPrice = this.toppings.map(function() {
      return parseInt($(this).val());
    })

    let totalPriceForToppings = 0;
    for(let i=0; i<toppingsPrice.length; i++){
      totalPriceForToppings += toppingsPrice[i];
    }

    letPriceOfOrder = (sizePrice + crustPrice + totalPriceForToppings) * this.count;
    return letPriceOfOrder;
  };

  function addToCart(order) {
    let toppings = order.toppings.map(function(){
      return this.id;
    })
    .get()
    .join();
    $("#pizzaStack tablebody").append(`<tr>
                              <td>${order.size.html()}</td>
                              <td>${order.crust.html()}</td>
                              <td>${toppings}</td>
                              <td>${order.getPrice()}</td>
                            </tr>`);

    var currentTotalCharge = parseInt($("#total-charge").html());
    $("#total-charge").html(currentTotalCharge + order.getPrice());
    $("#checkoutBtn").show();
    $("#delivery").show();
  }

});