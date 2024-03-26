import Item from "./Item";

window.onload = async () => {
    await showCart();
  };
  
  const BASE_URL = "";
  
    let cartArray = [];
  
    window.onload = async () => {
      await showCart();
      attachEventListeners();
    };

function attachEventListeners() {
      
};

async function showCart(){
    const storedCart = localStorage.getItem("cartArray");
    
}
