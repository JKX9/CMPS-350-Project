 export default class Account {

    static #idCounter = 0;
  constructor(id, type, firstName, lastName, email, address, password, purchases, balance) {
    this.id = id;
    this.type = type;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.address = address;
    this.password = password;
    this.purchases = purchases;
    this.balance = balance;
  }

  getID(){
    
  }
}