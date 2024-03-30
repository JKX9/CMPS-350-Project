import {init} from "../JavaScript/login2.js";

var MenuItems = document.getElementById("MenuItems");
MenuItems.style.maxHeight="0px";

document.addEventListener('DOMContentLoaded', function() {
    init();
    const account = localStorage.getItem('account');
    fetchAndInjectProducts();
    if(!account){
        document.getElementById('loginLink').setAttribute('href', 'login2.html');
    }else{
        account = JSON.parse(account);
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
        let items;
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
        <a href="" class="btn" onclick='addToCart(${product.id})'>Add to Cart</a>`;
    parentDiv.appendChild(card);
}
    // Call fetchAndInjectProducts to display products on page load







