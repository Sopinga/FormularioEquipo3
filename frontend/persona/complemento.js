document.addEventListener("DOMContentLoaded", function () {
    const cardContainer = document.getElementById("card-container");
    const searchPersona = document.getElementById("searchPerson")
    const URL = 'http://localhost:3000/personas';
    async function fetchPersonData() {
        try {
            const response = await fetch(`${URL}/${searchPersona}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const persona = await response.json();
                document.getElementById('nombre').innerText = persona.nombre;
                document.getElementById('apellido').innerText = persona.apellido;
                document.getElementById('email').innerText = persona.email;
                document.getElementById('cedula').innerText = persona.cedula;
                document.getElementById('rut').innerText = persona.rut;
                // Crear el contenedor de la tarjeta
                const card = document.createElement('div');
                card.classList.add('card');

                // Contenido de la tarjeta
                card.innerHTML = `
                        <h2>${document.getElementById('nombre').innerText} ${document.getElementById('apellido').innerText}</h2>
                        <p><strong>Cédula:</strong> ${document.getElementById('cedula').innerText}</p>
                        <p><strong>RUT:</strong> ${persona.rut}</p>
                        <p><strong>Correo:</strong> ${document.getElementById('email').innerText}</p>
                    `;

                // Agregar la tarjeta al contenedor principal
                cardContainer.appendChild(card);
            } else {
                console.error('Error al obtener los datos de la persona');
            }
        } catch (error) {
            console.error('Error al obtener los datos de la persona:', error);
            alert('Error al obtener los datos de la persona');
        }
    }



});