import Cart from "./Cart.js";
import Buyer from "./Buyer.js";
import Item from "./Item.js";
let cartsArray = [];
let accountsArray = [];
let purchasesArray = [];
let totalPayment = 0;

const account = new Buyer("buyer", "sultan", "alsaad", "salsaad", "password", [], [],1000);//findAccount();
let cart = null;
const item1 = new Item("../images/product-1.jpg", "Red Shirt", 3.00, 5, 2);
const item2 = new Item("../images/product-2.jpg", "Black Running Shoes", 52.00, 10, 1);
const item3 = new Item("../images/product-3.jpg", "Buttoned joggers", 35.00, 20, 1);

cartsArray.push(new Cart(3, [item1, item2, item3]));

async function fetcher(){
    const accountsStored = await fetch("../json/accounts.json");
    accountsArray = await accountsStored.json();
    const cartsStored = await fetch("../json/carts.json");
    cartsArray = await cartsStored.json();
}

document.addEventListener("DOMContentLoaded", () => {
    fetcher();
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

function addToSellerSoldList(){
    cart.itemsInCart.forEach(item =>{
        const seller = accountsArray.find(account => account.id == item.seller_id);
        seller.soldItems.push(item);
    })
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
        <input type="text" id="name" name="name" value=${account.firstName+" "+account.lastName}><br>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" value=${account.email}><br>

        <label for="address">Address:</label>
        <input type="text" id="address" name="address" value=${account.address}><br>

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

    if (account.address == " " || account.address == null || account.address == undefined || account.name == null || account.name == undefined || account.name == " " || account.email == null || account.email == undefined || account.email == " "){
        alert("Please fill in your details");
        return;
    }

    cart.itemsInCart.forEach(item => {
        item.item_stock -= item.quantitySelected;
    });
    account.balance -= totalPayment;
    addToSellerSoldList();
    account.purchases.push(cart);
    const cartIndex = cartsArray.indexOf(cart);
    cartsArray.splice(cartIndex, 1);
    window.location.replace("../html/successfulPurchase.html");
    
    // localStorage.setItem("cartsArray", JSON.stringify(cartsArray));
    // localStorage.setItem("accountsArray", JSON.stringify(accountsArray));
}