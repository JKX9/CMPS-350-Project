export default class{
    constructor (item_id, item_img, item_name, item_price, item_stock, quantitySelected){
        this.item_id = item_id;
        this.item_img = item_img;
        this.item_name = item_name;
        this.item_price = item_price;
        this.item_stock = item_stock;
        this.quantitySelected = quantitySelected
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