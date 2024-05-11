export default class Item {
    static item_id = 0;

    constructor (id, item_img, item_name, item_price, item_stock, quantitySelected, seller_id){
        this.item_img = item_img;
        this.item_name = item_name;
        this.item_price = item_price;
        this.item_stock = item_stock;
        this.quantitySelected = quantitySelected;
        this.seller_id = seller_id;
        this.item_id = id;
    }
}