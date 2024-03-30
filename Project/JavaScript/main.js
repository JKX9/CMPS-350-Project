import {getLoggedInAccount, init} from "../JavaScript/login.js";

import User from "../JavaScript/User.js";
import Item from "../JavaScript/Item.js";
import Cart from "../JavaScript/Cart.js";

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
    console.log('Document loaded');
    

    fetchAndInjectProducts();
    window.addToCart = addToCart;
    let accountType ;
    if(!getLoggedInAccount()){
        document.getElementById('loginLink').setAttribute('href', 'login.html');
    }else{
        accountType = getLoggedInAccount().getType();
        if(accountType === 'admin'){
            document.getElementById('loginLink').setAttribute('href', 'admin.html');
        }else if(accountType === 'seller'){
            document.getElementById('loginLink').setAttribute('href', 'seller.html');
        }else{
            document.getElementById('loginLink').setAttribute('href', 'customer.html');
        }
    }

    displayItemsForSale();
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
    if(!currentUser){
        alert('Please login to add items to cart');
        return;
    }
    
    console.log('Item added to cart');
    alert('Item added to cart');
    const product = items.find(item => item.item_id == itemId);
    cart.push(product);
    currentUser.cart = cart;
    //localStorage.setItem('account', JSON.stringify(currentUser));
}


async function fetchItemsForSale() {
    try {
        let accounts;
        if (!localStorage.accounts) {
            const response = await fetch('../data/accounts.json');
            accounts = await response.json();
            localStorage.accounts = JSON.stringify(accounts);
        } else {
            accounts = JSON.parse(localStorage.accounts);
        }

        const seller = accounts.find(account => account['account-type'] === 'seller');
        if (seller && seller.itemsForSale) {
            return seller.itemsForSale;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching items for sale:', error);
        return [];
    }
}


async function fetchSaleHistory() {
    try {
        let accounts;
        if (!localStorage.accounts) {
            const response = await fetch('../data/accounts.json');
            accounts = await response.json();
            localStorage.accounts = JSON.stringify(accounts);
        } else {
            accounts = JSON.parse(localStorage.accounts);
        }

        const seller = accounts.find(account => account['account-type'] === 'seller');
        if (seller && seller.saleHistory) {
            return seller.saleHistory;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching items for sale:', error);
        return [];
    }
}



    // Function to display items for sale
    async function displayItemsForSale() {
        const itemCardContainer = document.querySelector('.item-list');
        const itemsForSale = await fetchItemsForSale();

        itemCardContainer.innerHTML = ''; // Clear existing content

        itemsForSale.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('item-card');
            itemCard.innerHTML = `
                <img src="${item.image}" alt="${item.itemName}">
    <div class="item-details">
        <h4>${item.itemName}</h4>
        <p>Description: ${item.description}</p>
        <p>Price: $${item.price}</p>
        <p class="item-quantity">Quantity Available: ${item.quantityAvailable}</p>
    </div>
`;
            itemCard.addEventListener('click', () => {
                // Handle click event to view item details
                console.log('View item details:', item);
                // Implement logic to show item details
            });
            itemCardContainer.appendChild(itemCard);
        });
    }

    // Function to display sale history
    async function displaySaleHistory() {
        const saleHistorySection = document.getElementById('saleHistory');
        const saleHistoryContainer = saleHistorySection.querySelector('.sale-history');
        const saleHistory = await fetchSaleHistory();

        saleHistoryContainer.innerHTML = ''; // Clear existing content

        saleHistory.forEach(record => {
            const saleRecord = document.createElement('div');
            saleRecord.classList.add('item-card');
            saleRecord.innerHTML = `
                    <img src="${record.image}" alt="${record.itemName}">
                    <p>Item: ${record.itemName}</p>
                    <p>Quantity Sold: ${record.quantitySold}</p>
                    <p>Buyer: ${record.customerUsername}</p>
                    <p>Selling Price: $${record.sellingPrice}</p>
                `;
            saleHistoryContainer.appendChild(saleRecord);
        });
    }

    // Event listeners for showing sale history and items for sale
    document.getElementById('showSaleHistory').addEventListener('click', () => {
        document.getElementById('saleHistory').classList.remove('hidden');
        document.getElementById('itemsForSale').classList.add('hidden');
        displaySaleHistory();
    });

    document.getElementById('showItemsForSale').addEventListener('click', () => {
        document.getElementById('itemsForSale').classList.remove('hidden');
        document.getElementById('saleHistory').classList.add('hidden');
        displayItemsForSale();
    });
