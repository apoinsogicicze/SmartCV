var user = JSON.parse(sessionStorage.getItem('authenticatedUser'));

// Si aucun user dans le sessionStorage (pas connecté), redirection vers page login.html
if(!user) {
    window.location.href = 'login.html';
}
console.log(user);

$('#welcomeMessage').html('Welcome, ' + user.firstname + '!');

$('#logoutBtn').click(function() {
    sessionStorage.removeItem('authenticatedUser');
    window.location.href = 'login.html';
});