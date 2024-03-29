import Account from "./account";

let account = null;


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
        console.log(username, password);
    });
    const signupButton = document.getElementById('signup-btn');
    signupButton.addEventListener('click', () => {
        const username = document.getElementById('username-signup').value;
        const password = document.getElementById('password-signup').value;
        console.log(username, password);
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