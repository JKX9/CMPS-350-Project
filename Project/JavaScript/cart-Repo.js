import Item from "./Item.js";
import Cart from "./Cart.js";
  
//fix update quantity
//fix empty cart

let cartsArray = [];

window.onload = async () => {
  await showCart();
  attachEventListeners();
};

function attachEventListeners() {
      const submitBtns  = document.querySelectorAll(".submit-Btn")
};

const item1 = new Item("../images/product-1.jpg", "Red Shirt", 3.00, 5, 2, 1);
const item2 = new Item("../images/product-2.jpg", "Black Running Shoes", 52.00, 10, 1, 1);
const item3 = new Item("../images/product-3.jpg", "Buttoned joggers", 35.00, 20, 1, 1);
        
cartsArray.push(new Cart(3, [item1, item2, item3]));

async function showCart(){
    // const storedCarts = localStorage.getItem("cartsArray");
    // cartsArray = JSON.parse(storedCarts);
    
    if (!cartsArray){
        emptyCart();
    }

    else{
        const userId = 3;
        
        const cartNeededArr = cartsArray.filter(cart => cart.user_id!=userId);
        const cart = cartsArray[0];//cartNeededArr[0];
        
        cart.itemsInCart.forEach(element => {
            createItemCard(element)
        });
        const deleteButtons = document.querySelectorAll('.deleteItem');
        deleteButtons.forEach(button => {
        const parentCard = button.parentElement;
            button.addEventListener('click', () => removeFromCart(parentCard));
        });

        const updateButtons = document.querySelectorAll('.submit-btn');
        updateButtons.forEach(button => {
            const parentCard = button.parentElement;
            button.addEventListener('click', () => updateQuantity(parentCard));
        });
        showTotalPrice();
    }
}

function showTotalPrice(){
    const oldTotalPrice = document.getElementById("totalPrice");
    if(oldTotalPrice){
        oldTotalPrice.remove();
    }
    const cart = cartsArray[0];
    const itemsinsidecart = cart.itemsInCart;
    const totalPriceEle = document.createElement("p");
    totalPriceEle.setAttribute('id', "totalPrice");
    let totalPrice = 0;
    itemsinsidecart.forEach(item => totalPrice+=(item.item_price*item.quantitySelected));
    totalPriceEle.textContent = `Total Price:   ${totalPrice}`; 
    cartDiv.appendChild(totalPriceEle);
}

function checkEmpty(itemsInCart){
    if(itemsInCart.length == 0){
        emptyCart();
    }
}

function removeFromCart(parentCard){
    const itemId = parentCard.dataset.id;
    const cart = cartsArray[0];
    const cartItems = cart.itemsInCart;
    const itemToRemove = cartItems.find(item => item.item_id == itemId);
    console.log(itemToRemove);
    parentCard.remove();
    cartItems.splice(cartItems.indexOf(itemToRemove), 1);
    showTotalPrice();
    console.log(cartItems);
    checkEmpty(cart.itemsInCart);
    //localStorage.setItem("cartsArray", cartsArray);
}

function updateQuantity(parentCard){
    const itemId = parentCard.dataset.id;
    const cart = cartsArray[0];
    const cartItems = cart.itemsInCart;
    const itemToUpdate = cartItems.find(item => item.item_id == itemId);
    const quantity = parentCard.querySelector('input[type="number"]').value;
    if(quantity > itemToUpdate.item_stock){
        alert("Quantity exceeds stock");
        return;
    }
    itemToUpdate.quantitySelected = quantity;
    parentCard.querySelector('p').textContent = `Price:  $${itemToUpdate.item_price*quantity}`;
    showTotalPrice();
    //localStorage.setItem("cartsArray", cartsArray);
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
        <br>
        <label for="quantity">Quantity:</label>
        <input type="number" data-id="${itemId}" id="quantity" name="quantity" min="1" max="${item.item_stock} value="${item.quantitySelected}"">
        <button class="submit-btn">Submit</button>
        <br>
        <p>Price:  $${item.item_price*item.quantitySelected}</p>
        <br>
        <button class="deleteItem">Delete</button>
    `;
    parentDiv.appendChild(itemCard);
    const quant = document.querySelector(`input[type='number'][data-id='${item.item_id}']`);

    if(item.quantitySelected <= item.item_stock){
        quant.value = (item.quantitySelected);
    }
    else{
        quant.value = (item.item_stock);
    }

    
}



function emptyCart(){
    const emptyCart = document.createElement("div");
    emptyCart.classList.add("empty");
    emptyCart.innerHTML = "<h2>Cart is empty</h2>";
    const cartDiv = document.getElementById("ifCartEmpty");
    cartDiv.appendChild(emptyCart);
}