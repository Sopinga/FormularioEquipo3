import { fetchPersonData } from "../ver/complemento";

const URL = 'http://localhost:3000/personas';

function obtenerParams(param){
    const Param = new URLSearchParams(window.location.search);
    return Param.get(param);
}

const idPersona = obtenerParams('id');

if (idPersona) {fetchPersonData();} else {console.error('No ha ingresado un ID');}

const response = await fetch(`${URL}/${idPersona}`,
    {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json', },
    });

    //FALTA AGREGARLE LA LOGICA DEL BOTON ETC.

export {obtenerParams};