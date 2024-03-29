import Cart from "./Cart.js";
import Account from "./account.js";
import Item from "./Item.js";
import Purchase from "./Purchase.js";
//
let cartsArray = [];
let accountsArray = [];
let purchasesArray = [];
let totalPayment = 0;

const account = new Account(1, "buyer", "Sultan", "Al-Saad", "sultanAlSaad@gmail.com", "House x, street y, Zone z", "password", [], 1000);//findAccount();
let cart = null;
const item1 = new Item(1, "../images/product-1.jpg", "Red Shirt", 3.00, 5, 2);
const item2 = new Item(2, "../images/product-2.jpg", "Black Running Shoes", 52.00, 10, 1);
const item3 = new Item(3, "../images/product-3.jpg", "Buttoned joggers", 35.00, 20, 1);

cartsArray.push(new Cart(1, 3, [item1, item2, item3]));

document.addEventListener("DOMContentLoaded", () => {
    const userId = account.id;
    purchasesArray = account.purchases;
    showCart(3); //userId should be attribute
    createSummary();
});

function showCart(user_id){
        const cartNeededArr = cartsArray.filter(cart => cart.user_id!=user_id);
        cart = cartsArray[0];
        cart.itemsInCart.forEach(element => {
            createItemCardCheckout(element)
        });
}

function createItemCardCheckout(item){
    const itemCard = document.createElement("div");
    itemCard.classList.add("item-card");
    itemCard.dataset.id = item.item_id;
    itemCard.innerHTML = `
        <img src=${item.item_img} alt="">
        <h4>${item.item_name}</h4>
        <p>Quantity: ${item.quantitySelected}</p>
        <p>Price:   $${item.item_price*item.quantitySelected}</p>
    `;
    const itemHolder = document.getElementById("itemHolder");
    itemHolder.appendChild(itemCard);
}

function createSummary(){
    const parentDiv = document.getElementById("summaryHolder");
    const summary = document.createElement("div");
    summary.classList.add("paymentSummary-content");
    const totalpriceItems = cart.itemsInCart.reduce((acc, item) => acc + item.item_price*item.quantitySelected, 0);
    totalPayment = totalpriceItems;
    summary.innerHTML = `
        <h2>Order Summary:</h2>
        <br>`;
    const userDetail = document.createElement("form");
    userDetail.classList.add("userDetails");
    userDetail.innerHTML = `
        <label for="name" id="nameLabel">Name:</label>
        <input type="text" id="name" name="name" value=${account.firstName+" "+account.lastName} required><br>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" value=${account.email} required><br>

        <label for="address">Address:</label>
        <input type="text" id="address" name="address" value=${account.address} required><br>

        <p>Current Balance:  </p>
        <p id="balance">$${account.balance}</p>
        <br>
    `;
    const itemPrice = document.createElement("h3");
    itemPrice.innerHTML = `Price of items: ${totalpriceItems}`;
    summary.appendChild(userDetail);
    summary.appendChild(itemPrice);
    parentDiv.appendChild(summary);
}

const placeOrderBtn = document.getElementById("place-order");
placeOrderBtn.addEventListener("click", () => {
    placeOrder();
});

function placeOrder(){
    if (account.balance < totalPayment){
        alert("Insufficient funds");
        return;
    }
    account.name = document.getElementById("name").textContent;
    account.email = document.getElementById("email").textContent;
    account.address = document.getElementById("address").textContent;
    const order = new Purchase(account.id, cart);
    cart.itemsInCart.forEach(item => {
        item.item_stock -= item.quantitySelected;
    });
    account.balance -= totalPayment;
    purchasesArray.push(order);
    account.purchases = purchasesArray;
    const cartIndex = cartsArray.indexOf(cart);
    cartsArray.splice(cartIndex, 1);
    window.location.replace("../html/main.html");
    
    // localStorage.setItem("cartsArray", JSON.stringify(cartsArray));
    // localStorage.setItem("accountsArray", JSON.stringify(accountsArray));
}