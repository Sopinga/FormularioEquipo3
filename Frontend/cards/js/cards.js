async function cargarPersonas() {
    const respuesta = await fetch('/api/personas');
    const personas = await respuesta.json();

    const contenedor = document.getElementById('contenedor-personas');
    personas.forEach(persona => {
        const div = document.createElement('div');
        div.classList.add('persona');
        div.innerHTML = `
            <h2>${persona.nombre}</h2>
            <p>${persona.email}</p>
        `;
        contenedor.appendChild(div);
    });
}

cargarPersonas();
