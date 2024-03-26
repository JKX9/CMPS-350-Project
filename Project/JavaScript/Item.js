export default class{
    constructor (item_id, item_name, item_price, item_stock){
        this.item_id = item_id;
        this.item_name = item_name;
        this.item_price = item_price;
        this.item_stock = item_stock;
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