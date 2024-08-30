document.addEventListener("DOMContentLoaded", function () {
    const cardContainer = document.getElementById("card-container");

    // Cargar datos desde el archivo JSON
    fetch("http://localhost:3000/api/personas")
        .then(response => response.json())
        .then(data => {
            data.forEach(persona => {
                // Crear el contenedor de la tarjeta
                const card = document.createElement('div');
                card.classList.add('card');

                // Contenido de la tarjeta
                card.innerHTML = `
                    <h2>${persona.nombre} ${persona.apellido}</h2>
                    <p><strong>Cédula:</strong> ${persona.cedula}</p>
                    <p><strong>RUT:</strong> ${persona.rut}</p>
                    <p><strong>Correo:</strong> ${persona.email}</p>
                `;

                // Agregar la tarjeta al contenedor principal
                cardContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});
