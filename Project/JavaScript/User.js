export default class User {
    static #user_id = 0;
    constructor(username, password) {
        this.user_id = User.#user_id++;
        this.username = username;
        this.password = password;
    }

    static getAccountByUsername(username, password){
        const ls = localStorage.getItem('account');
        if(ls && JSON.parse(ls).username === username){
          return JSON.parse(ls);
        }else{
          const allAccounts = JSON.parse(localStorage.getItem('accounts'));
          return allAccounts.find(acc => acc.username === username && acc.password === password);
        }
      }
}