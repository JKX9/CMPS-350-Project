
async function fetchPurchaseHistory(buyerId) {
    try {
        const response = await fetch(`http://localhost:3000/api/Buyer/${buyerId}`); // Replace 'https://your-api-endpoint.com/items' with the actual API endpoint
        const items = await response.json();

        const customer = items.find(item => account.type === 'customer');
        if (customer && customer.purchases) {
            return customer.purchases;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching purchases items', error);
        return [];
    }
}
// Function to display purchases items
async function displayPurchaseHistory(buyerId) {
    try {
        const itemCardContainer = document.querySelector('.item-list');
        const purchases = await fetchPurchaseHistory(buyerId);

        itemCardContainer.innerHTML = ''; // Clear existing content

        purchases.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('item-card-sale');
            itemCard.innerHTML =
            `
                <img src="${item.item_img}" alt="${item.item_name}">
                <div class="item-details">
                <h3>Purchased item</h3>
                <h4>${item.item_name}</h4>
                <p>Price: $${item.item_price}</p>
                <p>Purchased Quantity: ${item.quantitySelected}</p>
                </div>
                `;
            itemCard.addEventListener('click', () => {
                // Handle click event to view item details
                console.log('View item details:', item);
                // Implement logic to show item details
            });
            itemCardContainer.appendChild(itemCard);
        });
    } catch (error) {
        console.error('Error displaying purchases items', error);
    }
}
const buyer= localStorage.getItem("currentAccount")
const buyerId = buyer.id
await displayPurchaseHistory(buyerId)

