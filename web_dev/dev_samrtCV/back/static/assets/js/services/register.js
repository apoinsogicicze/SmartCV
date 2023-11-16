document.getElementById('signup-form').addEventListener('submit', function(event) {
  event.preventDefault();

  var firstname = document.querySelector('input[name="firstname"]').value;
  var lastname = document.querySelector('input[name="lastname"]').value;
  var companyName = document.querySelector('input[name="companyname"]').value;
  var username = document.querySelector('input[name="username"]').value;
  var email = document.querySelector('input[name="email"]').value;
  var password = document.querySelector('input[name="password"]').value;

  var data = {
      firstname,
      lastname,
      companyName,
      username,
      email,
      password
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