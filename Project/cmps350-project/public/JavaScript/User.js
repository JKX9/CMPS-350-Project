

export default class User {
    static #user_id = 0;
    constructor(id, username, password, type) {
        this.user_id = id;
        this.username = username;
        this.password = password;
        this.type = type;
    }


      
}