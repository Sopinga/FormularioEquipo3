function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const idPersona = getQueryParam('id');

if (idPersona) {
    getPerson(idPersona);
} else {
    console.error('ID de persona no proporcionado');
}

async function getPerson(idPersona) {
    try {
        console.log('Haciendo fetch a:', `https://localhost/backend/personas/${idPersona}`);
        const response = await fetch(`https://localhost/backend/personas/${idPersona}`);

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
