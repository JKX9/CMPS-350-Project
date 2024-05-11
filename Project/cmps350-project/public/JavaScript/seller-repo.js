//script
let buyers = [];
export default buyers;

let idCounter = 100;
async function fetchItemsForSale() {
    try {
        let accounts = await returnAccount();
        const seller = accounts.find(account => account.type === 'seller');
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
        return returnLoggedInSeller().saleHistory;
    } catch (error) {
        console.error('Error fetching sale history:', error);
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
        itemCard.classList.add('item-card-sale');
        itemCard.innerHTML = `
            <img src="${item.item_img}" alt="${item.item_name}">
            <div class="item-details">
                <h3>Item ID: ${item.item_id}</h3>
                <h4>Item Name: ${item.item_name}</h4>
                <p>Price: $${item.item_price}</p>
                <p class="item-quantity">Quantity Available: ${item.item_stock}</p>
            </div>
        `;
        itemCardContainer.appendChild(itemCard);
    });
}

// Function to display sale history
async function displaySaleHistory() {
    const saleHistoryContainer = document.querySelector('.sale-history');
    const currentAccount = returnLoggedInSeller();
    console.log(currentAccount);
    const saleHistory = await fetchSaleHistory();
    
    saleHistoryContainer.innerHTML = ''; // Clear existing content

    saleHistory.forEach(record => {
        const saleRecord = document.createElement('div');
        saleRecord.classList.add('item-card-sale');
        saleRecord.innerHTML = `
            <img src="${record.image}" alt="${record.itemName}">
            <p>Item ID: ${record.itemId}</p>
            <p>Item: ${record.itemName}</p>
            <p>Quantity Sold: ${record.quantitySold}</p>
            <p>Buyer: ${record.customerUsername}</p>
            <p>Selling Price: $${record.sellingPrice.toFixed(2)}</p>
        `;
        saleHistoryContainer.appendChild(saleRecord);
    });
}

function returnLoggedInSeller(){
    return JSON.parse(localStorage.getItem('currentAccount'));
}

   async function returnAccount(){ 
        let accounts;
            if (!localStorage.accounts) {
                const response = await fetch('../data/accounts.json');
                accounts = await response.json();
                localStorage.accounts = JSON.stringify(accounts);
            } else {
                
                accounts = JSON.parse(localStorage.accounts);
            }
        
            return accounts;
    
    } 
 
    async function returnItems() {
        let items;
        if (!localStorage.items) {
            const response = await fetch('../data/NewItems.json');
            items = await response.json();
            localStorage.items = JSON.stringify(items);
        } else {
            items = JSON.parse(localStorage.items);
        }
        return items;
    }
    async function uploadItem(event) {
        event.preventDefault();
        let accounts;
            if (!localStorage.accounts) {
                const response = await fetch('../data/accounts.json');
                accounts = await response.json();
                localStorage.accounts = JSON.stringify(accounts);
            } else {
                accounts = JSON.parse(localStorage.accounts);
            }
    
        try {
            // Fetch existing items from localStorage or load from JSON
            let items = await returnItems();
            // Retrieve form data
            const itemName = document.getElementById('itemName').value;
            const description = document.getElementById('description').value;
            const price = parseFloat(document.getElementById('price').value);
            const quantity = parseInt(document.getElementById('quantity').value);
            const image = document.getElementById('image').files[0];
    
            // Validate form fields
            if (!itemName || !description || isNaN(price) || isNaN(quantity) || !image) {
                alert('Please fill all fields.');
                return;
            }

    
            // Create a new item object
            const newItem = {
                // item_id : idCounter++,
                item_name: itemName,
                item_price: price,
                item_stock: quantity,
                item_img: URL.createObjectURL(image) // Save image path to the image attribute
            };
    
            // Push the new item object to the items array
            // items.push(newItem);
            // const seller = accounts.find(account => account.type === 'seller');
            // if (seller && seller.saleHistory) {
            //     seller.itemsForSale.unshift(newItem);
            // }

            await fetch(`http://localhost:3000/Seller/${returnLoggedInSeller().id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({seller_id: returnLoggedInSeller().id, item : newItem})
            });
    
            // Save the updated items array to localStorage
            // localStorage.items = JSON.stringify(items);
            // localStorage.accounts= JSON.stringify(accounts);



            // const currentAccount = JSON.parse(localStorage.currentAccount);
            // currentAccount.itemsForSale.unshift(newItem);
            // localStorage.setItem('currentAccount', JSON.stringify(currentAccount));
    
            // Alert user about successful item upload
            alert('Item uploaded successfully.');
    
            // Clear form fields
            document.getElementById('itemName').value = '';
            document.getElementById('description').value = '';
            document.getElementById('price').value = '';
            document.getElementById('quantity').value = '';
            document.getElementById('image').value = '';
    
            // Optionally, update the displayed items for sale
            displayItemsForSale();
        } catch (error) {
            console.error('Error uploading item:', error);
            alert('Failed to upload item. Please try again later.');
        }
    }
    
    // Event listeners for showing sale history, items for sale, and uploading new item form
    document.getElementById('showSaleHistory').addEventListener('click', () => {
        document.getElementById('saleHistory').classList.remove('hidden');
        document.getElementById('itemsForSale').classList.add('hidden');
        document.getElementById('uploadItemForm').classList.add('hidden');
        displaySaleHistory();
    });
    
    document.getElementById('showItemsForSale').addEventListener('click', () => {
        document.getElementById('itemsForSale').classList.remove('hidden');
        document.getElementById('saleHistory').classList.add('hidden');
        document.getElementById('uploadItemForm').classList.add('hidden');
        displayItemsForSale();
    });
    
    document.getElementById('addNewItem').addEventListener('click', () => {
        document.getElementById('itemsForSale').classList.add('hidden');
        document.getElementById('saleHistory').classList.add('hidden');
        document.getElementById('uploadItemForm').classList.remove('hidden');
    });
    
    // Form submission event listener for uploading new item
    document.getElementById('itemUploadForm').addEventListener('submit', uploadItem);
    
    // Initial display
    displayItemsForSale();