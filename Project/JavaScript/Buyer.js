import User from "./User.js";

export default class Buyer extends User {
    constructor(username, firstname, lastName, email, password, cart_id, purchases, balance) {
        super(username, password);
        this.firstname = firstname;
        this.lastName = lastName;
        this.email = email;
        this.cart_id = cart_id;
        this.purchases = purchases;
        this.balance = balance;
    }

    getType(){
        return 'buyer';
    }
}