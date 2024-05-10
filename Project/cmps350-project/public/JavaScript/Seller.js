import User from "./User.js";

export default class Seller extends User{
    constructor(username, password, firstName, lastName, itemsForSale, saleHistory, bankAccount){
        super(username,  password, 'seller');
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