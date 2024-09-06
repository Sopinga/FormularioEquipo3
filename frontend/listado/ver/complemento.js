function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const id = getQueryParam('id');

if (id) {
    getPerson(id);
} else {
    console.error('ID de persona no proporcionado');
}

async function getPerson(id) {
    try {
        const response = await fetch(`http://localhost:3000/personas/${id}`, {
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

            console.log('La persona se ha cargado correctamente:', persona);
        } else {
            console.error('Error al obtener los datos de la persona');
        }
    } catch (error) {
        console.error('Error al obtener los datos de la persona:', error);
        alert('Error al obtener los datos de la persona');
    }
}