import User from './User.js';

export default class Admin extends User{
    constructor(username, password) {
        super(username, password, 'admin');
    }

    getType(){
        return 'admin';
    }
}