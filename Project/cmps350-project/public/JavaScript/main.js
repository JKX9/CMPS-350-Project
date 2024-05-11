import {getLoggedInAccount, init} from "./login.js";

import Admin from "./Admin.js";
import Item from "./Item.js";
import Seller from "./Seller.js";
import Buyer from "./Buyer.js";

var MenuItems = document.getElementById("MenuItems");
MenuItems.style.maxHeight="0px";
//redirect user to login page if not logged in and clicks cart

let currentUser = null;
let cart = currentUser ? currentUser.cart : [];
let items;

currentUser = JSON.parse(localStorage.getItem("currentAccount"));

const admins = [new Admin('Sultan', 'password'), 
                new Admin('Mohammed', 'password'), 
                new Admin('Essa', 'password')];

document.addEventListener('DOMContentLoaded', function() {
    init();
    localStorage.setItem('admins', JSON.stringify(admins));
    const accList = [];
    // const fet = fetch('../data/accounts.json').then(response => response.json()).then(data => {
        // data.forEach(account => {
        //     let obj;
        //     if(account.type == 'customer'){
        //         obj = new Buyer(account.username, account.firstname, account.lastname, account.email, account.password, account.cart, account.purchases, account.balance, account.address)
        //         accList.push(obj);
        //     }else if(account.type == 'seller'){
        //         obj = new Seller(account.username, account.password, account.firstname, account.lastname, account.itemsForSale, account.saleHistory, account.bankAccount)
        //         accList.push(obj);
        //     }else if(account.type === 'admin'){
        //         obj = new Admin(account.username, account.password);
        //         accList.push(obj);
        //     }
        // });
        // localStorage.setItem('accounts', JSON.stringify(accList));
    
        // fetchAndInjectProducts();
        window.addToCart = addToCart;
   
        function navigateTo(){
            let account ;
                
            if(!localStorage.getItem('currentAccount')){
                document.getElementById('loginLink').setAttribute('href', '/html/login.html');
            }else{
                account = JSON.parse(localStorage.getItem('currentAccount'));
            if(account.type === 'admin'){
                document.getElementById('loginLink').setAttribute('href', '/html/admin.html');
            }else if(account.type === 'seller'){
                document.getElementById('loginLink').setAttribute('href', '/html/seller.html');
            }else{
                document.getElementById('loginLink').setAttribute('href', '/html/customer.html');
            }
        }
        }

        window.navigateTo = navigateTo();
    // });
});

const searchInput = document.getElementById('searchBar');
searchInput.addEventListener('input', () => {
    const searchQuery = searchInput.value.trim();
    filterProducts(searchQuery.toLowerCase());
});
function filterProducts(searchQuery) {
    const itemCards = document.querySelectorAll('.item-card');
    itemCards.forEach(card => {
        const itemName = card.querySelector('h4').textContent.toLowerCase();
        if (itemName.includes(searchQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function menutoggle() {
    if (MenuItems.style.maxHeight=="0px"){
        MenuItems.style.maxHeight="200px"
    }
    else {
        MenuItems.style.maxHeight="0px"
    }
}

async function fetchAndInjectProducts() {
    try {
        if (!localStorage.items) {
            const data = await fetch('../data/NewItems.json');
            items = await data.json();
            localStorage.items = JSON.stringify(items);
        }
        else {
            items = JSON.parse(localStorage.items);
        }

        const productsContainer = document.querySelector('#product');
        if (items && items.length > 0) {
            items.forEach(product => {
                createCard(product);
            });
        } else {
            productsContainer.innerHTML = '<p>No products found</p>';
        }
    } catch (error) {
        console.error('Error fetching and injecting products:', error);
    }
}


function createCard(product){
    const parentDiv= document.getElementById('itemCont');
    const card = document.createElement('div');
    card.classList.add('item-card');
    card.dataset.id = product.id;
    card.innerHTML = `
        <img src="${product.item_img}" alt="${product.item_name}">
        <h4>${product.item_name}</h4>
        <p>$${product.item_price}</p>
        <button class="btn" onclick='addToCart(${product.item_id})'>Add to Cart</button>`;
    parentDiv.appendChild(card);
}

async function addToCart(itemId) {
    if(!currentUser){
        alert('Please login to add items to cart');
        return;
    }
    if(cart.find(item => item.item_id == itemId)){
        alert('Item already in cart');
        return;
    }
    console.log('Item added to cart');
    alert('Item added to cart');
    const product = items.find(item => item.item_id == itemId);
    cart.push(product);
    currentUser.cart = cart;
    await fetch(`/api/Buyer/${currentUser.user_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentUser),
    });
}