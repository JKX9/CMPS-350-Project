 export default class Account {

    static #idCounter = 0;
  constructor(id, type, firstName, lastName, email, password, purchases) {
    this.id = id;
    this.type = type;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.purchases = purchases;
  }

  getID(){
    
  }
}