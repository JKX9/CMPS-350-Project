import Item from "./Item.js";
import Cart from "./Cart.js";

//Delete and update quantity left


window.onload = async () => {
    await showCart();
  };
  
const BASE_URL = "";
  
let cartsArray = [];

window.onload = async () => {
  await showCart();
  attachEventListeners();
};

function attachEventListeners() {
      const submitBtns  = document.querySelectorAll(".submit-Btn")
};

const item1 = new Item(1, "../images/product-1.jpg", "Red Shirt", 3.00, 5, 2);
const item2 = new Item(2, "../images/product-2.jpg", "Black Running Shoes", 52.00, 10, 1);
const item3 = new Item(3, "../images/product-3.jpg", "Buttoned joggers", 35.00, 20, 1);
        
cartsArray.push(new Cart(1, 3, [item1, item2, item3]));

async function showCart(){
    // const storedCart = localStorage.getItem("cartsArray");
    // cartsArray = JSON.parse(storedCart);
    

    if (!cartsArray){
        const emptyCart = document.createElement("div");
        emptyCart.classList.add("empty");
        emptyCart.innerHTML = "<h2>Cart is empty</h2>";
        const cartDiv = document.getElementById("ifCartEmpty");
        cartDiv.appendChild(emptyCart);
    }

    else{
        const userId = 3;
        
        const cartNeededArr = cartsArray.filter(cart => cart.user_id!=userId);
        const cart = cartsArray[0];
        showTotalPrice();
        cart.itemsInCart.forEach(element => {
            createItemCard(element)
        });
    }

    function showTotalPrice(){
        const cart = cartsArray[0];
        const itemsinsidecart = cart.itemsInCart;
        const totalPriceEle = document.createElement("p");
        totalPriceEle.setAttribute('id', "totalPrice");
        let totalPrice = 0;
        
        itemsinsidecart.forEach(item => totalPrice+=(item.item_price*item.quantitySelected));

        totalPriceEle.textContent = `Total Price:   ${totalPrice}`; 
        cartDiv.appendChild(totalPriceEle);
    }
}


function removeFromCart(parentCard){
    const itemId = parentCard.dataset.id;
    const cart = cartsArray[0];
    const cartItems = cart.itemsInCart;
    const itemToRemove = cartItems.find(item => item.item_id == itemId);
    parentCard.remove();
    cartItems.splice(cartItems.indexOf(itemToRemove), 1);
    console.log(cartItems);
    //localStorage.setItem("cartsArray", cartsArray);
}

function updateQuantity(item){
    const quant = document.querySelector(`input[type='number'][data-id='${item.item_id}']`);
    item.quantitySelected = quant;  
}

function createItemCard(item){
    const parentDiv = document.getElementById("cartDiv")
    const itemCard = document.createElement("div");
    itemCard.dataset.id = item.item_id;
    itemCard.classList.add("item-card");
    const itemId = item.item_id; 
    itemCard.innerHTML = `
        <img src=${item.item_img} alt="itemImage">
        <h3>${item.item_name}</h3>
        <p hidden>${itemId}</p>
        <br>
        <label for="quantity">Quantity:</label>
        <input type="number" data-id="${itemId}" id="quantity" name="quantity" min="1" max="${item.item_stock}">
        <input onclick="updateQuantity(${item})" type="submit">
        <br>
        <p>Price:  $${item.item_price*item.quantitySelected}</p>
        <br>
        <button class="deleteItem">Delete</button>
    `;
    parentDiv.appendChild(itemCard);
    const quant = document.querySelector(`input[type='number'][data-id='${item.item_id}']`)
    if(item.quantitySelected <= item.item_stock){
        quant.value = String.valueOf(item.quantitySelected);
    }
    else{
        quant.value = String.valueOf(item.item_stock);
    }

    const deleteButtons = document.querySelectorAll('.deleteItem');
    deleteButtons.forEach(button => {
        const parentCard = button.parentElement;
        button.addEventListener('click', () => removeFromCart(parentCard));
    });
}




