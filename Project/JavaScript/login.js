document.addEventListener('DOMContentLoaded', function() {

    
    const form = document.getElementById('login-form');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (email.value === 'admin' && password.value === 'admin') {
            window.location.href = 'home.html';
        } else {
            error.innerHTML = 'Invalid email or password';
        }
    }
    );


startAnimation();
});

// function startAnimation() {
//     // Set a timer to start the animation after 2 seconds
//     setTimeout(function() {
//       var label = document.getElementById('error');
//       label.classList.remove('hidden2');
//     }, 2000); // 2000 milliseconds = 2 seconds
// }