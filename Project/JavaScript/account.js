const accounts = 
[
    {
      "id": 1,
      "account-type": "admin",
      "first-name": "Sultan",
      "last-name": "Al-Saad",
      "username": "Sultan",
      "password": "12345678",
      "cart": "[]"

  },
  {
      "id": 2,
      "account-type": "admin",
      "first-name": "Mohammed",
      "last-name": "Ahmed",
      "username": "Mohammed",
      "password": "12345678",
      "cart": "[]"
  },
  {
      "id": 3,
      "account-type": "admin",
      "first-name": "Essa",
      "last-name": "Al-Mannai",
      "username": "Essa",
      "password": "12345678",
      "cart": "[]"
  },
  {
      "id": 4,
      "account-type": "seller",
      "first-name": "seller1",
      "last-name": "test",
      "username": "seller1",
      "password": "78907890",
      "cart": "[]"
  },    {
      "id": 5,
      "account-type": "customer",
      "first-name": "customer1",
      "last-name": "test",
      "username": "customer1",
      "password": "12341234",
      "cart": "[]"
  }
]

 export default class Account {

  static #idCounter = 0;
  constructor(id, type, firstName, lastName, username, password, purchases, balance) {
    this.id = id;
    this.type = type;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.purchases = purchases;
    this.balance = balance;
  }

  static getID(){

    return Account.#idCounter++;

  }

  static getAccountByUsername(username){
    const ls = localStorage.getItem('account');

    if(ls && JSON.parse(ls).username === username){
      return JSON.parse(ls);
    }else{
      return accounts.find(acc => acc.username === username);
    }
  }
}
