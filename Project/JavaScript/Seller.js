import User from "./User";

export default class Seller extends User{
    constructor(username, password, firstName, lastName, itemsOnSale, soldItems, bankAccount){
        super(username,  password);
        this.firstName = firstName;
        this.lastName = lastName;
        this.itemsOnSale = itemsOnSale;
        this.soldItems = soldItems;
        this.bankAccount = bankAccount;
    }
}