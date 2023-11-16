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
const spinner = document.createElement('div');
spinner.classList.add('spinner-border', 'text-primary', 'mt-2');
spinner.setAttribute('role', 'status');
document.querySelector('#result-spinner').appendChild(spinner);
const competencesS = $('#competencesS');
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
        console.log('traitement_premier tablaeau')

        const dataArray = JSON.parse(data.data.replace(/'/g, '"'));
        console.log(dataArray);        
        const tableContainer = document.getElementById('result-table-1');

        const table = document.createElement('table');
        table.classList.add('table', 'table-bordered', 'table-striped'); // Add Bootstrap classes

        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
          
        <th scope="col">Classement par Pourcentage de similarité</th>
          <th scope="col">Email</th>
        
          <th scope="col">Année d'expérience</th>
          
          <th scope="col">Pourcentage de Similarité</th>
        `;
        table.appendChild(headerRow);
        let i = 0
        dataArray.forEach( info => {
          i +=1
          const { email, pourcentage_similarite: pourcentage, expérience,comp } = info;

          const row = document.createElement('tr');
          row.innerHTML = `
            <th scope="row">${i}</th>
            
            <td>${email}</td>
            <td>${expérience}</td>
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
})
competencesS.show()
// Display a spinner
/*const spinner = document.createElement('div');
spinner.classList.add('spinner-border', 'text-primary', 'mt-2');
spinner.setAttribute('role', 'status');*/
document.querySelector('#result-spinner').appendChild(spinner);
$(document).ready(function() {
  const competencesFilter = $('#competencesFilter');
  const competencesSection = $('#competencesSection');
  const experienceFilter = $('#experienceFilter');
  const validerButton = $('#validerButton');
  // Ajout ******************** 
  const tableContainer = $('#result-table-container');
  const resultTable = $('#result-table');

  // Créez la table une seule fois lors du chargement de la page
  resultTable.addClass('table table-bordered table-striped');
  const headerRow = $('<tr>').append(
    $('<th>').text('Classement par Pourcentage de similarité'),
    $('<th>').text('Email'),
    $('<th>').text("Année d'expérience"),
    $('<th>').text('Pourcentage de Similarité')
  );
  resultTable.append($('<thead>').append(headerRow));
  tableContainer.append(resultTable);
  //Ajout *****************************
  fetch('http://localhost:8000/getskills', {
    method: 'POST',
  })
    .then(response => response.json())
    .then(data => {
      if (data && data.data) {
        try {
          spinner.remove()
          const jsonData = data.data.replace(/'/g, '"').replace(/\n/g, '');
          const dataArray = JSON.parse(jsonData);
          const competencesArray = dataArray.map(item => item.compétence);
          // Créez la liste déroulante avec Select2
          competencesFilter.select2({
            data: competencesArray.map(skillObject => ({
              id: skillObject,
              text: skillObject,
            })),
            multiple: true,
            placeholder: 'Sélectionnez les compétences',
          });
        } catch (error) {
          console.error('Error processing data:', error);
        }
      }
    })
    .catch(error => console.error('Error fetching skills:', error));
  
  
  competencesSection.show();
  validerButton.on('click', function() {
    // Récupérer les valeurs des filtres
    const selectedCompetences = competencesFilter.val();
    const selectedExperience = experienceFilter.val();
    const competencesArray = Array.from(selectedCompetences);
    document.querySelector('#result-spinner').appendChild(spinner);
    fetch('http://localhost:8000/run_script', {
      method: 'POST',
      body: JSON.stringify({
        compétences: competencesArray,
        expérience: selectedExperience,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        // Logique pour afficher les résultats
        if (data) { // Check if data and data.data are both present
          try {
            spinner.remove();
            console.log(data);
    
            const dataArray = JSON.parse(data.data.replace(/'/g, '"'));
            //const resultCompArray = result.comp.toLowerCase().split(' ');
            console.log(dataArray);  
            //Ajout********************
            resultTable.find('tbody').remove();
            //Ajout *******************
            const filteredResults = dataArray.filter(result =>
              competencesArray.every(comp => result.comp.toLowerCase().includes(comp.toLowerCase())) &&
              //competencesArray.every(comp => resultCompArray.includes(comp.toLowerCase())) &&
              result.expérience >= selectedExperience
            )
            console.log(filteredResults); 
               
            const tableContainer = document.getElementById('result-table');
    
            const table = document.createElement('table');
            table.classList.add('table', 'table-bordered', 'table-striped'); // Add Bootstrap classes
    
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = `
            
            <th scope="col">Classement par Pourcentage de similarité</th>
              <th scope="col">Email</th>
            
              <th scope="col">Année d'expérience</th>
              <th scope="col">Pourcentage de Similarité</th>
            `;
            table.appendChild(headerRow);
            let i = 0
            filteredResults.forEach(info => {
              i +=1
              const { email, pourcentage_similarite: pourcentage, expérience } = info;
    
              const row = document.createElement('tr');
              row.innerHTML = `
                <th scope="row">${i}</th>
                
                <td>${email}</td>
                <td>${expérience}</td>
                
                <td>${parseFloat(pourcentage).toFixed(4)}</td>
              `;
              //table.appendChild(row);
              resultTable.append($('<tbody>').append(row));
            });
    
          // tableContainer.appendChild(table);
          } catch (error) {
            console.error('Error processing data:', error);
          }
        } else {
          console.error('Invalid data format:', data);
        }
      })
      .catch(error => console.error('Error:', error));
    });
});

/*onst competencesFilter = document.getElementById('competencesFilter');
const experienceFilter = document.getElementById('experienceFilter');
const selectedCompetencesDisplay = document.getElementById('selectedCompetencesDisplay');
fetch('http://localhost:8000/getskills', {
  method: 'POST',
})
  .then(response => response.json())
  .then( data => {
    if (data && data.data) {
      try {
        spinner.remove();
        console.log(data)
        
        const jsonData = data.data.replace(/'/g, '"').replace(/\n/g, '');
        const dataArray = JSON.parse(jsonData);
        console.log(dataArray);
        // Ajoutez les compétences à la liste déroulante
        const selectCompetences = document.createElement('select');
        selectCompetences.multiple = true;
        selectCompetences.size = 5;
        dataArray.forEach(skill => {
          const option = document.createElement('option');
          option.value = skill.compétence;
          option.text = skill.compétence;
          selectCompetences.appendChild(option);
        });
        competencesFilter.appendChild(selectCompetences);
        selectCompetences.addEventListener('change', updateSelectedCompetences);

        function updateSelectedCompetences() {
          // Récupérez les options sélectionnées
          const selectedOptions = Array.from(selectCompetences.selectedOptions).map(option => option.text);

          // Mettez à jour l'affichage des compétences sélectionnées
          selectedCompetencesDisplay.textContent = `Compétences sélectionnées : ${selectedOptions.join(', ')}`;
        }
      }catch (error) {
        console.error('Error processing data:', error);
      }
    }
  })
  .catch(error => console.error('Error fetching skills:', error));*/

// Ajoutez un gestionnaire d'événements pour les changements dans les filtres
//competencesFilter.addEventListener('change', updateTable);
//experienceFilter.addEventListener('change', updateTable);

// Fonction pour mettre à jour le tableau en fonction des filtres


// Utilisez ces valeurs pour ajuster la requête vers le serveur

// Send the percentage to the server along with the request to /run_script
/*fetch('http://localhost:8000/run_script', {
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
         
        <th scope="col">Classement par Pourcentage de similarité</th>
          <th scope="col">Email</th>
        
          <th scope="col">Année d'expérience</th>
          <th scope="col">Pourcentage de Similarité</th>
        `;
        table.appendChild(headerRow);
        let i = 0
        dataArray.forEach(info => {
          i +=1
          const { email, pourcentage_similarite: pourcentage, expérience } = info;

          const row = document.createElement('tr');
          row.innerHTML = `
            <th scope="row">${i}</th>
            
            <td>${email}</td>
            <td>${expérience}</td>
            
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
  });*/
})
