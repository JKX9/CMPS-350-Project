export default class Purchase{
    constructor(purchase_id, account_id, cartPurchased, delivery){
        this.purchase_id = purchase_id;
        this.account_id = account_id;
        this.cartPurchased = cartPurchased;
        this.delivery = delivery;
    }
}