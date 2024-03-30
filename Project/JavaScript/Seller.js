import User from "./User";

export default class Seller extends User{
    constructor(user_id, username, password, itemsOnSale, soldItems, bankAccount){
        super(user_id, username,  password);
        this.itemsOnSale = itemsOnSale;
        this.soldItems = soldItems;
        this.bankAccount = bankAccount;
    }
}