import User from "./User.js";

export default class Seller extends User{
    constructor(id, username, password, firstName, lastName, itemsForSale, saleHistory, bankAccount){
        super(id, username,  password, 'seller');
        this.firstName = firstName;
        this.lastName = lastName;
        this.itemsForSale = itemsForSale;
        this.saleHistory = saleHistory;
        this.bankAccount = bankAccount;
    }

    getType(){
        return 'seller';
    }
}