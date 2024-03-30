import Item from "./Item.js";
import Buyer from "./Buyer.js";

const account = JSON.parse(localStorage.getItem("currentAccount"));
const cart = account.cart;
window.onload = async () => {
  await showCart();
  attachEventListeners();
};

function attachEventListeners() {
      const submitBtns  = document.querySelectorAll(".submit-Btn")
};

async function showCart(){
    if (account.cart.length==0){
        emptyCart();
    }
    else{
        const cart = account.cart;
        cart.forEach(element => {
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
    const cart = account.cart;
    const itemsinsidecart = cart;
    const totalPriceEle = document.createElement("p");
    totalPriceEle.setAttribute('id', "totalPrice");
    let totalPrice = 0;
    itemsinsidecart.forEach(item => totalPrice+=(item.item_price*item.quantitySelected));
    totalPriceEle.textContent = `Total Price:   ${totalPrice}`; 
    cartDiv.appendChild(totalPriceEle);
}

function checkEmpty(){
    console.log(cart);
    if(cart.length == 0){
        emptyCart();
    }
}

function removeFromCart(parentCard){
    const itemId = parentCard.dataset.id;
    const cartItems = account.cart;
    const itemToRemove = cartItems.find(item => item.item_id == itemId);
    console.log(itemToRemove);
    parentCard.remove();
    cartItems.splice(cartItems.indexOf(itemToRemove), 1);
    showTotalPrice();
    console.log(cartItems);
    checkEmpty(cart.itemsInCart);
    localStorage.setItem('currentAccount', JSON.stringify(account));
}

function updateQuantity(parentCard){
    const itemId = parentCard.dataset.id;
    const cartItems = account.cart
    const itemToUpdate = cartItems.find(item => item.item_id == itemId);
    const quantity = parentCard.querySelector('input[type="number"]').value;
    console.log(itemToUpdate);
    if(quantity > itemToUpdate.item_stock){
        alert("Quantity exceeds stock");
        return;
    }
    itemToUpdate.quantitySelected = quantity;
    parentCard.querySelector('p').textContent = `Price:  $${itemToUpdate.item_price*quantity}`;
    showTotalPrice();
    localStorage.setItem("currentAccount", JSON.stringify(account)); 
}

function createItemCard(item){
    const parentDiv = document.getElementById("cartDiv")
    const itemCard = document.createElement("div");
    itemCard.dataset.id = item.item_id;
    console.log(item);
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