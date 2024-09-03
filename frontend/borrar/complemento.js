function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const personId = getQueryParam('id');

if (personId) {
    fetchPersonData();
} else {
    console.error('ID de persona no proporcionado');
}
try {
    const response = await fetch(`'http://localhost:3000/personas'/${personId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const persona = await response.json();
        const card = document.createElement('div');
        card.classList.add('card');

        // Contenido de la tarjeta
        card.innerHTML = `
                        <h2>${persona.nombre} ${persona.apellido}</h2>
                        <p><strong>Cédula:</strong> ${persona.cedula}</p>
                        <p><strong>RUT:</strong> ${persona.rut}</p>
                        <p><strong>Correo:</strong> ${persona.email}</p>
                    `;
    } else {
        console.error('Error al obtener los datos de la persona');
    }
} catch (error) {
    console.error('Error al obtener los datos de la persona:', error);
    alert('Error al obtener los datos de la persona');
}