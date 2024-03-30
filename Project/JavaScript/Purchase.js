export default class Purchase{
    static #purchase_id = 0;
    constructor(account_id, cartPurchased){
        this.account_id = account_id;
        this.cartPurchased = cartPurchased;
        this.purchase_id=Purchase.#purchase_id++;
    }
}