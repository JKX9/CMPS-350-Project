// async function fetchItemsForSale(sellerId) {
//     try {
//         const response = await fetch('../data/accounts.json');
//         const data = await response.json();
//         const seller = data.find(item => item.id === sellerId && item.account-type === 'seller');
//         return seller ? seller.itemsForSale : [];
//     } catch (error) {
//         console.error('Error fetching items for sale:', error);
//         return [];
//     }
// }

// // Function to fetch sale history for a specific seller
// async function fetchSaleHistory(sellerId) {
//     try {
//         const response = await fetch('../data/items.json');
//         const saleHistory = await response.json();
//         return saleHistory.filter(item => item.sold && item.sellerId === sellerId);
//     } catch (error) {
//         console.error('Error fetching sale history:', error);
//         return [];
//     }
// }

// // Function to display items for sale for a specific seller
// async function displayItemsForSale(sellerId) {
//     const itemCardContainer = document.querySelector('.item-list');
//     const itemsForSale = await fetchItemsForSale(sellerId);

//     itemCardContainer.innerHTML = ''; // Clear existing content

//     itemsForSale.forEach(item => {
//         const itemCard = document.createElement('div');
//         itemCard.classList.add('item-card');
//         itemCard.innerHTML = `
//             <img src="${item.image}" alt="${item.itemName}" width="200">
//             <div class="item-details">
//                 <h4>${item.itemName}</h4>
//                 <p>Description: ${item.description}</p>
//                 <p>Price: $${item.price}</p>
//                 <p class="item-quantity">Quantity Available: ${item.quantityAvailable}</p>
//             </div>
//         `;
//         itemCard.addEventListener('click', () => {
//             console.log('View item details:', item);
//             // Implement logic to show item details
//         });
//         itemCardContainer.appendChild(itemCard);
//     });
// }

// // Function to display sale history for a specific seller
// async function displaySaleHistory(sellerId) {
//     const saleHistoryContainer = document.querySelector('.sale-history');
//     const saleHistory = await fetchSaleHistory(sellerId);

//     saleHistoryContainer.innerHTML = ''; // Clear existing content

//     saleHistory.forEach(record => {
//         const saleRecord = document.createElement('div');
//         saleRecord.innerHTML = `
//             <p>Item: ${record.itemName}</p>
//             <p>Quantity Sold: ${record.quantitySold}</p>
//             <p>Buyer: ${record.buyer}</p>
//             <p>Selling Price: $${record.sellingPrice}</p>
//         `;
//         saleHistoryContainer.appendChild(saleRecord);
//     });
// }

// // Event listener for showing items for sale
// document.getElementById('showItemsForSale').addEventListener('click', () => {
//     const sellerId = /* get seller ID */;
//     document.querySelector('.item-list').classList.remove('hidden');
//     document.querySelector('.sale-history').classList.add('hidden');
//     displayItemsForSale(sellerId);
// });

// // Event listener for showing sale history
// document.getElementById('showSaleHistory').addEventListener('click', () => {
//     const sellerId = /* get seller ID */;
//     document.querySelector('.sale-history').classList.remove('hidden');
//     document.querySelector('.item-list').classList.add('hidden');
//     displaySaleHistory(sellerId);
// });

// // Initial display for a specific seller
// const initialSellerId = /* specify seller ID */
// displayItemsForSale(initialSellerId); // or displaySaleHistory(initialSellerId) if you want to show sale history initially
