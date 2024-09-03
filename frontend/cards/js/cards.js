//document.addEventListener("DOMContentLoaded", function () {
const cardContainer = document.getElementById("card-container");

async function getcardContainer() {
  //console.log('IniciogetCardContainer()');
  try {
      // Cargar datos desde el archivo JSON
      const response = await fetch("http://localhost:3000/personas");
      const data = await response.json();
      console.log('datos :', data);
        
      cardContainer.innerHTML = '';
         
      // Crear el contenedor de la tarjeta     
      const card = document.createElement('div');
      card.classList.add('card');
      // Contenido de la tarjeta
      card.innerHTML = `
        <h2>${persona.nombre} ${persona.apellido}</h2>
        <p><strong>Cédula:</strong> ${persona.cedula}</p>
        <p><strong>RUT:</strong> ${persona.rut}</p>
        <p><strong>Correo:</strong> ${persona.correo}</p>
        <p><strong>Correo:</strong> ${persona.email}</p>
      `;

      // Agregar la tarjeta al contenedor principal
      cardContainer.appendChild(card);
    
    } catch(error) {
      console.error('Error al cargar los datos:', error);
    }
  }     
  getCardContainer();