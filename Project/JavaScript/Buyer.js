import User from "./User.js";

export default class Buyer extends User{
    constructor(user_id, username, email, password, cart_id, purchases, balance){
        super(user_id, username,  password);
        this.email = email;
        this.cart_id = cart_id;
        this.purchases = purchases;
        this.balance = balance;
    }
}