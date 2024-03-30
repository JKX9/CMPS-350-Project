import User from "./User.js";

export default class Seller extends User{
    constructor(username, password, firstName, lastName, itemsOnSale, saleHistory, bankAccount){
        super(username,  password, 'seller');
        this.firstName = firstName;
        this.lastName = lastName;
        this.itemsOnSale = itemsOnSale;
        this.saleHistory = saleHistory;
        this.bankAccount = bankAccount;
    }

    getType(){
        return 'seller';
    }
}