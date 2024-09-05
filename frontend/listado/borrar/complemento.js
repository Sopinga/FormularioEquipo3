import { id, btnEliminar } from "../complemento.js";
btnEliminar.addEventListener(click, async function () {
    console.log("Botón eliminar presionado");
    if (confirm('¿Está seguro que desea eliminar esta persona?')) {
        // Realizar petición DELETE al backend
        fetch(`/personas/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    alert('Persona eliminada correctamente');
                    // Actualiza la vista si es necesario
                } else {
                    alert('Hubo un error al eliminar la persona');
                }
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert('Eliminación cancelada');
    }

})

const URL = 'http://localhost:3000/personas';




const response = await fetch(`${URL}/${idPersona}`,
    {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', },
    });

//FALTA AGREGARLE LA LOGICA DEL BOTON ETC.

export { obtenerParams };