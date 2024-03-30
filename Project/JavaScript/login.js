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

    signInBtn.addEventListener('click', (event) => {        console.log('login');

        event.preventDefault();
        const username = document.getElementById('username-login').value;
        const password = document.getElementById('password-login').value;
        if(performLogin(username, password) === true){
            window.location.href = 'main.html';
        }
        else{
            errMsg.textContent ='Invalid username or Password';
            errMsg.style.color = 'red';
        }
    });



    signUpBtn.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('signup');

        const username = document.getElementById('username-signup').value;
        const password = document.getElementById('password-signup').value;
        const firstName = document.getElementById('firstName-signup').value;
        const lastName = document.getElementById('lastName-signup').value;
        if(!performSignup(username, password, firstName, lastName)){
            errMsg2.textContent ='Account exists';
            errMsg2.style.color = 'red';
        }
        else{
            performSignup(username, password, firstName, lastName);
            localStorage.setItem('account', JSON.stringify(new Account(Account.getID(), firstName, lastName, username, password, [])));
            alert('Account created successfully');
            window.location.href = 'main.html';
        }
    });
});



 function init(){
    if(localStorage.getItem('account')){
        const info = JSON.parse(localStorage.getItem('account'));
        account = new Account(info.id, info.type, info.firstName, info.lastName, info.email, info.password, info.purchases);
    }else{
        account = null;
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
    const createdAccount = new Account(Account.getID(), firstName, lastName, username, password, [], 0);
    localStorage.setItem('account', JSON.stringify(createdAccount));
    account = createdAccount;
    return true;
}