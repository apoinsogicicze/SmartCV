// JavaScript for CV upload
$('.browse-button-cv input:file').change(function () {
  let fileList = $('#file-list-cv')
  fileList.empty() // Clear existing list

  let files = this.files // Get the selected files

  for (let i = 0; i < files.length; i++) {
    let fileName = files[i].name
    fileList.append('<li>' + fileName + '</li>')
  }

  $('.browse-button-text').html('<i class="fa fa-refresh"></i> Change')
  $('.clear-button').show()
})

// Actions happening when the CV upload button is clicked
$('.clear-button').click(function () {

  $('.filename').val('')
  $('.clear-button').hide()
  $('input[name="attachment_cv"]').val('')
  $('.browse-button-text').html('<i class="fa fa-folder-open"></i> Browse')
  $('#file-list-cv').empty() // Clear the file list
})

// JavaScript for job upload
$(".browse-button-job input[name='attachment_job']").change(function () {
  let fileList = $('#file-list-job')
  fileList.empty() // Clear existing list

  let files = this.files // Get the selected files

  for (let i = 0; i < files.length; i++) {
    let fileName = files[i].name
    fileList.append('<li>' + fileName + '</li>')
  }

  $('.browse-button-text-job').html('<i class="fa fa-refresh"></i> Change')
  $('.clear-button-job').show()
})

// Actions happening when the job upload button is clicked
$('.clear-button-job').click(function () {
  $('.filename').val('')
  $('.clear-button-job').hide()
  $('input[name="attachment_job"]').val('')
  $('.browse-button-text-job').html('<i class="fa fa-folder-open"></i> Browse')
  $('#file-list-job').empty() // Clear the file list
})

document.querySelector('.upload-button-cv').addEventListener('click', function () {
  event.preventDefault(); 
  let input = document.querySelector('input[type="file"]')
  let files = input.files
  let formData = new FormData()
  console.log(files)
  for (let i = 0; i < files.length; i++) {
    formData.append('attachment_cv', files[i])
  }

  // Send the files to the server using fetch API
  fetch('http://localhost:8000/upload_cv', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      // Check if the response contains "Files uploaded successfully"
      if (data.includes('Files uploaded successfully')) {
        // Show the success modal
        var modal = document.getElementById('successModal')
        modal.style.display = 'block'
      }
    })
    .catch((error) => {
      console.error('Error:', error)
    })
})

document.querySelector('.upload-button-job').addEventListener('click', function () {
  let input = document.querySelector('input[name="attachment_job"]')
  let files = input.files
  let formData = new FormData()
  for (let i = 0; i < files.length; i++) {
    formData.append('attachment_job', files[i])
  }

  // Send the files to the server using fetch API
  fetch('http://localhost:8000/upload_job', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      // Check if the response contains "Files uploaded successfully"
      if (data.includes('Files uploaded successfully')) {
        // Show the success modal
        var modal = document.getElementById('successModal')
        modal.style.display = 'block'
      }
    })
    .catch((error) => {
      console.error('Error:', error)
    })
})

// show modal
document.addEventListener('DOMContentLoaded', function () {
  // Get the modal
  var modal = document.getElementById('successModal')

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName('close')[0]

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = 'none'
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none'
    }
  }
})

document.querySelector('.large-button').addEventListener('click', function () {
  // Get the percentage value from the input field
  // let percentage = document.getElementById('sectionPercentage').value

 // Display a spinner
const spinner = document.createElement('div');
spinner.classList.add('spinner-border', 'text-primary', 'mt-2');
spinner.setAttribute('role', 'status');
document.querySelector('#result-spinner').appendChild(spinner);

// Send the percentage to the server along with the request to /run_script
fetch('http://localhost:8000/run_script', {
  method: 'POST',
})
  .then((response) => response.json())
  .then(data => {
    // Remove the spinner
    spinner.remove();
    
    if (data) { // Check if data and data.data are both present
      try {
        console.log(data)

        const dataArray = JSON.parse(data.data.replace(/'/g, '"'));
        console.log(dataArray);        
        const tableContainer = document.getElementById('result-table');

        const table = document.createElement('table');
        table.classList.add('table', 'table-bordered', 'table-striped'); // Add Bootstrap classes

        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
          <th scope="col">#</th>
          <th scope="col">Nom</th>
          <th scope="col">Email</th>
          <th scope="col">Téléphone</th>
          <th scope="col">Pourcentage de Similarité</th>
        `;
        table.appendChild(headerRow);
        let i = 0
        dataArray.forEach(info => {
          i +=1
          const { nom, email, phone, pourcentage_similarite: pourcentage } = info;

          const row = document.createElement('tr');
          row.innerHTML = `
            <th scope="row">${i}</th>
            <td>${nom}</td>
            <td>${email}</td>
            <td>${phone}</td>
            <td>${parseFloat(pourcentage).toFixed(4)}</td>
          `;
          table.appendChild(row);
        });

        tableContainer.appendChild(table);
      } catch (error) {
        console.error('Error processing data:', error);
      }
    } else {
      console.error('Invalid data format:', data);
    }
  })
  .catch(error => {
    // Remove the spinner in case of an error
    spinner.remove();
    console.error('Error:', error);
  });
})