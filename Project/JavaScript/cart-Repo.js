import Item from "./Item.js";

window.onload = async () => {
    await showCart();
  };
  
  const BASE_URL = "";
  
    let cartsArray = [];

    window.onload = async () => {
      await showCart();
      attachEventListeners();
    };

function attachEventListeners() {
      const submitBtns  = document.querySelectorAll(".submit-Btn")
};

async function showCart(){
    const storedCart = localStorage.getItem("cartsArray");
    cartsArray = JSON.parse(storedCart)
    if (!storedCart || cartsArray.length==0){
        const emptyCart = document.createElement("div");
        emptyCart.classList.add("empty");
        emptyCart.innerHTML = "<h2>Cart is empty</h2>";
        const cartDiv = document.getElementById("ifCartEmpty");
        cartDiv.appendChild(emptyCart);
    }

    else{
        cartsArray.map()
    }
}
