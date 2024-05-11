export default class Transaction{
    constructor(buyer_id, seller_id, product_id, quantity, date){
        this.buyer_id = buyer_id;
        this.seller_id = seller_id;
        this.product_id = product_id;
        this.quantity = quantity;
        this.date = date;
    }
}