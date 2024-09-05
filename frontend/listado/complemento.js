/*const URL = 'http://localhost:3000/personas';
document.addEventListener("DOMContentLoaded", function () {
    const cardContainer = document.getElementById("card-container");

    // Cargar datos desde el archivo JSON
    fetch("http://localhost:3000/personas")
        .then(response => response.json())
        .then(data => {
            data.forEach(persona => {
                // Crear el contenedor de la tarjeta
                const card = document.createElement('div');
                card.className = 'card';
                card.setAttribute('data-id', persona.id);
                card.classList.add('card');

                // Contenido de la tarjeta
                card.innerHTML = `
                    <h2>${persona.nombre} ${persona.apellido}</h2>
                    <p><strong>Cédula:</strong> ${persona.cedula}</p>
                    <p><strong>RUT:</strong> ${persona.rut}</p>
                    <p><strong>Correo:</strong> ${persona.email}</p>
                     <button class="btnEliminar" onClick= "DeletePerson()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg></button>
                    <button class="btnEditar" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                    </svg></button>
                `;
                cardContainer.appendChild(card);
            });
            const asyncBtn = card.querySelector('btnEliminar');
            const id = this.parentNode.getAttribute('data-id');
            asyncBtn.addEventListener('click', async () => {
                await DeletePerson(id);
            });
            // Añadir event listeners para los botones de redirección
            document.querySelectorAll('btnEditar').forEach(button => {
                button.addEventListener('click', function () {
                    const id = this.parentNode.getAttribute('data-id');
                    window.location.href = `/${id}/editar/index.html`;  // Redirección a la página de editar
                });
            });
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});*/
async function DeletePerson(Id) {
    console.log("Botón eliminar presionado");

    // Pregunta si realmente desea eliminarlo
    const confirmDelete = confirm("¿Seguro que desea eliminar esta persona?");
    console.log('Alerta funciona correctamente');
    if (!confirmDelete) return;

    if (!Id) {
        console.error('ID de persona no proporcionado');
        return;
    }
    console.log('Eliminando persona con ID:', Id);

    try {
        const response = await fetch(`${URL}/${Id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Respuesta del servidor:', await response.text());

        if (response.ok) {
            alert('Persona eliminada con éxito');
            window.location.href = '/';
        } else {
            alert('Error al eliminar la persona');
        }
    } catch (error) {
        console.error('Error al eliminar la persona:', error);
        alert('Error al eliminar la persona');
    } alert('Eliminación cancelada');
}
;
async function fetchCards() {
    try {
        const response = await fetch('http://localhost:3000/personas'); // Endpoint donde obtienes los datos
        const cards = await response.json();

        const container = document.getElementById('cards-container');

        cards.forEach(persona => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.setAttribute('data-id', persona.id);

            card.innerHTML = `
                    <h2>${persona.nombre} ${persona.apellido}</h2>
                    <p><strong>Cédula:</strong> ${persona.cedula}</p>
                    <p><strong>RUT:</strong> ${persona.rut}</p>
                    <p><strong>Correo:</strong> ${persona.email}</p>
                     <button class="btnEliminar" onClick= "DeletePerson()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg></button>
                    <button class="btnEditar" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                    </svg></button>
                `;

            container.appendChild(cardElement);
        });

        // Llama la función para añadir los event listeners
        attachEventListeners();
    } catch (error) {
        console.error('Error fetching cards:', error);
    }
}

function attachEventListeners() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const cardId = card.getAttribute('data-id');

        const asyncBtn = card.querySelector('btnEliminar');
        asyncBtn.addEventListener('click', async () => {
            await DeletePerson(cardId);
        });

        const redirectBtn = card.querySelector('btnEditar');
        redirectBtn.addEventListener('click', () => {
            handleRedirect(cardId);
        });
    });
}

// Llama a la función para obtener las cards del backend
fetchCards();

