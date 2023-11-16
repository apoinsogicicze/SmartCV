document.getElementById('signup-form').addEventListener('submit', function(event) {
  event.preventDefault();

  var username = document.querySelector('input[type="text"]').value;
  var email = document.querySelector('input[type="email"]').value;
  var password = document.querySelector('input[type="password"]').value;

  var data = {
      username: username,
      email: email,
      password: password
  };

  fetch('http://localhost:8000/add_user', {
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
  .then(data => {
      console.log('Success:', data);
      // Show the success modal
      var modal = document.getElementById('success-modal');
      modal.style.display = "block";

      // When the user clicks the "Next" button, redirect to login
      document.getElementById('next-button').addEventListener('click', function() {
        window.location.href = 'login.html';
      });

  })
  .catch(error => {
      console.error('Error:', error);
  });
});