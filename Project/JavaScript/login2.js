import Account from "./account.js";

let account = null;
export default account;



document.addEventListener('DOMContentLoaded', function() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    
    const loginButton = document.getElementById('login-btn');
    loginButton.addEventListener('click', () => {
        const username = document.getElementById('username-login').value;
        const password = document.getElementById('password-login').value;
        if(performLogin(username, password) === true){
            window.location.href = 'main.html';
        }
        else{
            const errMsg = document.getElementById('error');
            errMsg.textContent ='Invalid username or Password';
            errMsg.style.color = 'red';
        }
    });
    const signupButton = document.getElementById('signup-btn');
    signupButton.addEventListener('click', () => {
        const username = document.getElementById('username-signup').value;
        const password = document.getElementById('password-signup').value;
        console.log(username, password);
    });
});

export function init(){
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

function performSignup(username, password){
    if(Account.getAccountByUsername(username)){
        return false;
    }
    const createdAccount = new Account(Account.getID(), firstName, lastName, username, password, []);
    localStorage.setItem('account', JSON.stringify(account));
    account = createdAccount;
    return true;
}