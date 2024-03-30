import Account from '../JavaScript/account.js';

let loggedInAccount = null;
export default loggedInAccount;

document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const signInBtn = document.getElementById('login-btn');
    const signUpBtn = document.getElementById('signup-btn');
    const errMsg = document.getElementById('error');
    const errMsg2 = document.getElementById('error2');
    console.log(signInBtn);
    console.log(signUpBtn);
    console.log(errMsg);
    console.log(errMsg2);

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

        if(!performSignup(username.value, password.value, firstName.value, lastName.value)){
            errMsg2.textContent ='Account exists';
            errMsg2.style.color = 'red';
            username.value = '';
            password.value = '';
            firstName.value = '';
            lastName.value = '';
        }
        else{
            performSignup(username.value, password.value, firstName.value, lastName.value);
            localStorage.setItem('account', JSON.stringify(new Account(Account.getID(),"customer", firstName.value, lastName.value, username.value, password.value, [])));
            alert('Account created successfully');
            window.location.href = 'main.html';
        }
    });
});



 function init(){
    if(localStorage.getItem('account')){
        const info = JSON.parse(localStorage.getItem('account'));
        loggedInAccount = new Account(info.id, info.type, info.firstName, info.lastName, info.email, info.password, info.purchases);
    }else{
        loggedInAccount = null;
    }
}

function performLogin(username, password){
    const account = Account.getAccountByUsername(username);
    if(account){
        if(account.password === password){
            return true;
        }else{
            return 'Invalid Password'
        }
    }
    return false;
}

function performSignup(username, password, firstName, lastName){
    if(Account.getAccountByUsername(username)){
        return false;
    }
    const createdAccount = new Account(Account.getID(), "customer", firstName, lastName, username, password, [], 0);
    localStorage.setItem('account', JSON.stringify(createdAccount));
    loggedInAccount = createdAccount;
    return true;
}