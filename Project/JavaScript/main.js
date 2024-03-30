import {getLoggedInAccount, init} from "../JavaScript/login.js";

import Account from "../JavaScript/account.js";
import Item from "../JavaScript/Item.js";
import Cart from "../JavaScript/Cart.js";
import loggedInAccount from "../JavaScript/login.js";

var MenuItems = document.getElementById("MenuItems");
MenuItems.style.maxHeight="0px";
//redirect user to login page if not logged in and clicks cart

let cartsArray = [];
let currentUser = null;
let cart = currentUser ? currentUser.cart : [];
let items;

currentUser = new Account(1, "buyer", "sultan", "alsaad", "salsaad", "password", [], 1000);//findAccount();
const item1 = new Item(1, "../images/product-1.jpg", "Red Shirt", 3.00, 5, 2);
const item2 = new Item(2, "../images/product-2.jpg", "Black Running Shoes", 52.00, 10, 1);
const item3 = new Item(3, "../images/product-3.jpg", "Buttoned joggers", 35.00, 20, 1);

cartsArray.push(new Cart(3, [item1, item2, item3]));



document.addEventListener('DOMContentLoaded', function() {
    init();

    fetchAndInjectProducts();
    window.addToCart = addToCart;
    let account ;
    if(!getLoggedInAccount()){
        document.getElementById('loginLink').setAttribute('href', 'login.html');
    }else{
        account = getLoggedInAccount();
        if(account.type === 'admin'){
            document.getElementById('loginLink').setAttribute('href', 'admin.html');
        }else if(account.type === 'seller'){
            document.getElementById('loginLink').setAttribute('href', 'seller.html');
        }else{
            document.getElementById('loginLink').setAttribute('href', 'customer.html');
        }
    }
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
        <img src="${product.image}" alt="${product.itemName}">
        <h4>${product.itemName}</h4>
        <p>$${product.price}</p>
        <button class="btn" onclick='addToCart(${product.id})'>Add to Cart</button>`;
    parentDiv.appendChild(card);
}

function addToCart(itemId) {
    console.log('Item added to cart');
    alert('Item added to cart');
    const product = items.find(item => item.item_id == itemId);
    cart.push(product);
    currentUser.cart = cart;
    //localStorage.setItem('account', JSON.stringify(currentUser));
}