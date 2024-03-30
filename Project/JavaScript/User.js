export default class User {
    static #user_id = 0;
    constructor(username, password) {
        this.user_id = User.#user_id++;
        this.username = username;
        this.password = password;
    }
}