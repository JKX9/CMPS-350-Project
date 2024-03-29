import Cart from "./Cart.js";
import Account from "./account.js";
import Item from "./Item";

let cartsArray = [];
let accountsArray = [];
let purchasesArray = [];
const account = findAccount();

document.addEventListener("DOMContentLoaded", () => {
    const userId = account.id;
    purchasesArray = account.purchases;
    showCart(3); //userId should be attribute
});

function showCart(user_id){
        const cartNeededArr = cartsArray.filter(cart => cart.user_id!=user_id);
        const cart = cartsArray[0];
        cart.itemsInCart.forEach(element => {
            createItemCardCheckout(element)
        });
}

const placeOrderBtn = document.getElementById("place-order");
placeOrderBtn.addEventListener("click", () => {
    
});

function createItemCardCheckout(item){
    const itemCard = document.createElement("div");
    itemCard.classList.add("item-card");
    itemCard.dataset.id = item.item_id;
    itemCard.innerHTML = `
        <img src=${item.item_img} alt="">
        <h4>${item.item_name}</h4>
        <p>Quantity: ${item.quantitySelected}</p>
        <p>Price:   ${item.item_price}</p>
    `;
    const itemHolder = document.getElementById("itemHolder");
    itemHolder.appendChild(itemCard);
}