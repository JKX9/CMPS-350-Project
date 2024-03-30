export default class Admin extends Account{
    constructor(id, username, password) {
        super(id, account_type, first_name, last_name, username, password, cart);
    }
}