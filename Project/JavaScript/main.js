import {init} from "../JavaScript/login2.js";
// import account from "../JavaScript/login2.js";

document.addEventListener('DOMContentLoaded', function() {
    init();
    const account = localStorage.getItem('account');

    if(!account){
        document.getElementById('loginLink').setAttribute('href', 'login2.html');
    }else{
        account = JSON.parse(account);
        if(account.type === 'admin'){
            document.getElementById('loginLink').setAttribute('href', 'admin.html');
        }else if(account.type === 'seller'){
            document.getElementById('loginLink').setAttribute('href', 'seller.html');
        }else{
            document.getElementById('loginLink').setAttribute('href', 'customer.html');
        }
    }
});

