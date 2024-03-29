 import accounts from '../data/accounts.json'
 export default class Account {

  static #idCounter = 0;
  constructor(id, type, firstName, lastName, username, password, purchases) {
    this.id = id;
    this.type = type;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.purchases = purchases;
    this.balance = balance;
  }

  getID(){
    return idCounter++;
  }

  static getAccountByUsername(username){
    const ls = localStorage.getItem('account');
    if(ls){
      return JSON.parse(ls);
    }else{
      const searchResault = JSON.parse(accounts).find(account => account.username === username);
      if(searchResault){
        return searchResault;
      }
    }
    return null;
  }
  
}
