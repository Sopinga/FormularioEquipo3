async function obtenerPersonas() {
    try {
        const response = await fetch('http://localhost:3000/api/personas', {
            method: 'GET', // El método es GET por defecto, así que es opcional incluirlo
            headers: {
                'Content-Type': 'application/json' // Especifica el tipo de contenido
            }
        });

        // Verifica si la solicitud fue exitosa
        if (!response.ok) {
            throw new Error('Error al obtener las personas');
        }

        const data = await response.json();
        console.log('Personas obtenidas del servidor:', data);

        // Aquí puedes hacer algo con los datos obtenidos, como mostrarlos en el HTML
        mostrarPersonas(data);

    } catch (error) {
        console.error('Error al realizar la solicitud GET:', error);
    }
}

// Función para mostrar las personas en el HTML (opcional)
function mostrarPersonas(personas) {
    const listaPersonas = document.getElementById('listaPersonas');
    listaPersonas.innerHTML = ''; // Limpiamos la lista antes de llenarla de nuevo

    personas.forEach(persona => {
        const li = document.createElement('li');
        li.textContent = `${persona.nombre}, ${persona.edad} años`;
        listaPersonas.appendChild(li);
    });
}

// Llamar a la función obtenerPersonas al cargar la página
document.addEventListener('DOMContentLoaded', obtenerPersonas);
