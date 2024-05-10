export default class Cart {
    static #cart_id = 0;
    constructor(user_id, itemsInCart){
        this.user_id = user_id;
        this.itemsInCart = itemsInCart;
        this.cart_id= Cart.#cart_id++;
    }
}