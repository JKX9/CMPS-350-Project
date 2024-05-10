import Cart from "./Cart.js";
import Buyer from "./Buyer.js";
import Item from "./Item.js";
import Seller from "./Seller.js";
const accountsArray = JSON.parse(localStorage.getItem("accounts"));
let purchasesArray = [];
let totalPayment = 0;
const account = JSON.parse(localStorage.getItem("currentAccount"));

let cart = null;

//buyers.push(account.username)

document.addEventListener("DOMContentLoaded", () => {

    purchasesArray = account.purchases;
    showCart(); //userId should be attribute
    createSummary();
    

});

function showCart(){
        cart = account.cart;
        cart.forEach(element => {
            createItemCardCheckout(element)
        });
}

//comment

function addToSellerSoldList(){
    console.log(cart);
    cart.forEach(item =>{
        let sellerIndex = accountsArray.findIndex(account => account.user_id == item.seller_id);
        if(sellerIndex == -1) return;
        let seller = accountsArray[sellerIndex]
        seller.saleHistory.push(item);
        accountsArray[sellerIndex] = seller
        console.log(seller)
    })        

    localStorage.setItem("accounts", JSON.stringify(accountsArray));

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
    const totalpriceItems = cart.reduce((acc, item) => acc + item.item_price*item.quantitySelected, 0);
    totalPayment = totalpriceItems;
    summary.innerHTML = `
        <h2>Order Summary:</h2>
        <br>`;
    const userDetail = document.createElement("form");
    console.log(account);
    userDetail.classList.add("userDetails");
    userDetail.innerHTML = `
        <label for="name" id="nameLabel">Name:</label>
        <input type="text" id="name" name="name" value=${account.username}><br>

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
    cart.forEach(item => {
        item.item_stock -= item.quantitySelected;
    });
    account.balance -= totalPayment;
    addToSellerSoldList();
    cart.forEach(item => account.purchases.push(item));
    account.cart = [];
    localStorage.setItem("currentAccount", JSON.stringify(account));
    window.location.replace("../html/successfulPurchase.html");
    
}