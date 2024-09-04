document.addEventListener("DOMContentLoaded", function () {
    const cardContainer = document.getElementById("card-container");
    const searchPersona = document.getElementById("searchPerson")
    const URL = 'http://localhost:3000/personas';
    async function PersonData() {
        try {
            const response = await fetch(`${URL}/${searchPersona}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const persona = await response.json();
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