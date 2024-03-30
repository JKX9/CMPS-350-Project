import User from '../JavaScript/User.js';
import Seller from '../JavaScript/Seller.js';
import Buyer from '../JavaScript/Buyer.js';

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
        if(performLogin(username.value, password.value) === true){
            window.location.href = 'main.html';
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
        console.log('signup');

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
            localStorage.setItem('account', JSON.stringify(new Account(Account.getID(),type, firstName.value, lastName.value, username.value, password.value, [])));
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
    const account = User.getAccountByUsername(username, password);
    if(account){
        return true;
    }else{
        return 'Invalid username or Password'
    }
}

function performSignup(username, type, password, firstName, lastName){
    if(User.getAccountByUsername(username, password)){
        return false;
    }
    if(type === 'seller'){
        const createdAccount = new Seller( firstName, lastName, username, password, [], 0);
        localStorage.setItem('account', JSON.stringify(createdAccount));
        loggedInAccount = createdAccount;
        return true;
    }else if (type === 'buyer'){
        const createdAccount = new Buyer( firstName, lastName, username, password, [], 0);
        localStorage.setItem('account', JSON.stringify(createdAccount));
        loggedInAccount = createdAccount;
        return true;
    }
    else{
        return false;
    }
}