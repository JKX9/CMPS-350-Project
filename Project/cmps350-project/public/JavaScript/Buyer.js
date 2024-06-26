import User from "./User.js";

export default class Buyer extends User {
    constructor(id, username, firstname, lastName, email, password, cart, purchases, balance, address) {
        super(id, username, password, 'buyer');
        this.firstname = firstname;
        this.lastName = lastName;
        this.email = email;
        this.cart = cart;
        this.purchases = purchases;
        this.balance = balance;
        this.address = address;
    }

    getType() {
        return 'buyer';
    }
}