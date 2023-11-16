document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();

  var username = document.querySelector('input[name="login_username"]').value;
  var password = document.querySelector('input[name="login_password"]').value;

  var data = {
      username: username,
      password: password
  };

  fetch('http://localhost:8000/authenticate_user', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(respBody => {
    const userData = respBody.data;
    const user = {
      firstname: userData[1],
      lastname: userData[2],
      companyName: userData[3],
      email: userData[4],
      username: userData[5],
    };

    sessionStorage.setItem('authenticatedUser', JSON.stringify(user));
    window.location.href='profile.html';

  })
  .catch(error => {
    var modal = document.getElementById('login-fail-modal');
    modal.style.display = "block";
    document.getElementById('ok-button').addEventListener('click', function() {
        modal.style.display = "none";
      });
  });
});