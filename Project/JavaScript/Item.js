export default class Item {
    constructor (item_id, item_img, item_name, item_price, item_stock, quantitySelected, seller_id){
        this.item_id = item_id;
        this.item_img = item_img;
        this.item_name = item_name;
        this.item_price = item_price;
        this.item_stock = item_stock;
        this.quantitySelected = quantitySelected;
        this.seller_id = seller_id;
    }

    checkStock(quantity){
        if (quantity > this.item_stock){
            return false;
        }
        else{
            return true;
        }
    }
}