import User from '../JavaScript/User.js';
import Buyer from '../JavaScript/Buyer.js';
import Seller from '../JavaScript/Seller.js';
import Admin from '../JavaScript/Admin.js';


let loggedInAccount = null;
export default loggedInAccount;

document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const signInBtn = document.getElementById('login-btn');
    const signUpBtn = document.getElementById('signup-btn');
    const errMsg = document.getElementById('error');
    const errMsg2 = document.getElementById('error2');

    signInBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const username = document.getElementById('username-login');
        const password = document.getElementById('password-login');
        console.log(performLogin(username.value, password.value));
        if(performLogin(username.value, password.value) != 'Invalid username or Password'){
            
            window.location.href = 'main.html';
            loggedInAccount = JSON.parse(localStorage.getItem('currentAccount'));
        }
        else{
            errMsg.textContent ='Invalid username or Password';
            errMsg.style.color = 'red';
            username.value = '';
            password.value = '';
        }
    });



    signUpBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const username = document.getElementById('username-signup');
        const password = document.getElementById('password-signup');
        const firstName = document.getElementById('firstName-signup');
        const lastName = document.getElementById('lastName-signup');
        const radBtns = document.getElementsByName('radioButtons');
        let type ;
        for(let i = 0; i < radBtns.length; i++){
            if(radBtns[i].checked){
                type = radBtns[i].value;
            }
        }
    

        if(!performSignup(username.value, type, password.value, firstName.value, lastName.value)){
            errMsg2.textContent ='Account exists';
            errMsg2.style.color = 'red';
            username.value = '';
            password.value = '';
            firstName.value = '';
            lastName.value = '';
        }
        else{
            performSignup(username.value,type,  password.value, firstName.value, lastName.value);
            alert('Account created successfully');
            window.location.href = 'main.html';
        }
    });
});



export function init(){
    if(localStorage.getItem('account')){
        const info = JSON.parse(localStorage.getItem('account'));
        loggedInAccount = new Account(info.id, info.type, info.firstName, info.lastName, info.email, info.password, info.purchases, 0);
    }else{
        loggedInAccount = null;
    }
}

export function getLoggedInAccount(){
    return loggedInAccount;
}

function performLogin(username, password){
    const account = getAccountByUsername(username, password);
    console.log(account);
    if(account){
        return account;
    }else{
        return 'Invalid username or Password'
    }
}


function performSignup(username, type, password, firstName, lastName){
    if(getAccountByUsername(username, password)){
        return false;
    }
    if (type === 'buyer'){
        const createdAccount = new Buyer(firstName, lastName, username, password, [], 0);
        localStorage.setItem('account', JSON.stringify(createdAccount));
        loggedInAccount = createdAccount;
        return true;
    }
    else if (type === 'seller'){
        const createdAccount = new Seller(firstName, lastName, username, password, [], 0);
        localStorage.setItem('account', JSON.stringify(createdAccount));
        loggedInAccount = createdAccount;
        return true;
    }
    else{
        return false;
    }
}

async function getAccountByUsername(username, password) {
    // const ls = localStorage.getItem('account');
    // let resault = false;

    // if (ls && JSON.parse(ls).username === username && JSON.parse(ls).password === password) {
    //     console.log('store0');
    //     return JSON.parse(ls);
    // }
    // else if (JSON.parse(localStorage.getItem('accounts')) !== null &&
    //     JSON.parse(localStorage.getItem('accounts')) != []) {
    //     const storedAccounts = JSON.parse(localStorage.getItem('accounts'));
    //     storedAccounts.forEach(acc => {
    //         // console.log(acc.user_id, acc.username, acc.password,acc.type, username, password)
    //         if (acc.type === 'buyer' && acc.username === username && acc.password === password) {
    //             const store = new Buyer(acc.username, acc.firstname, acc.lastName,acc.email, acc.password, acc.cart, acc.purchases, acc.balance, acc.address);
    //             localStorage.setItem('currentAccount', JSON.stringify(store));
    //             console.log('store1');
    //             resault =  true;
    //         }
    //         else if (acc.type === 'seller' && acc.username === username && acc.password === password) {
    //             console.log('acc = ', acc);
    //             const store = new Seller(acc.username, acc.password, acc.firstname, acc.lastName, acc.itemsOnSale, acc.saleHistory, acc.bankAccount);
    //             localStorage.setItem('currentAccount', JSON.stringify(store));
    //             console.log('store2');
    //             resault =  true;
    //         }
    //         }
            
    //     );
    //     // while(true){}
    // }
    // else if (localStorage.getItem('admins') ) {
    //     const admins = JSON.parse(localStorage.getItem('admins'));
    //     admins.forEach(admin => {
    //         if (admin.username === username && admin.password === password) {
    //             const store = new Admin(admin.username, admin.password)
    //             localStorage.setItem('currentAccount', JSON.stringify(store));
    //             resault =  true;
    //         }

    //     });
    // }
    // return resault;

    const res = await fetch('http://localhost:3000/api/accounts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: "Sultan", password: "12345678"})
    }).then(response => response.json()).then(
        data => {
            switch(data.message){
                case 'admin' : {
                    const acc = new Admin(data.admins[0].username, data.admins[0].password);
                    localStorage.setItem('currentAccount', JSON.stringify(acc));
                    console.log(acc)
                    return true;
                }
                case 'buyer' : {
                    const acc = new Buyer(data.buyers[0].username, data.buyers[0].firstName, data.buyers[0].lastName, data.buyers[0].email, data.buyers[0].password, null, data.buyers[0].purchasedItems, data.buyers[0].balance, data.buyers[0].address);
                    localStorage.setItem('currentAccount', JSON.stringify(acc));
                    console.log(acc)
                    return true;
                }
                case 'seller' : {
                    const acc = new Seller(data.sellers[0].username, data.sellers[0].password, data.sellers[0].firstName, data.sellers[0].lastName, data.sellers[0].itemsForSale, null, null);
                    localStorage.setItem('currentAccount', JSON.stringify(acc));
                    console.log(acc)
                    return true;
                }
            }
        }
    )
  }