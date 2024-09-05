import { obtenerParams } from "../borrar/complemento";

const idPersona = obtenerParams('id');

const URL = 'http://localhost:3000'

class Persona {
    persona(nombre, apellido, email, cedula, rut, contrasena){
        this.id = personaId;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.cedula = cedula;
        this.rut = rut;
        this.contrasena = contrasena;
    }
}

const person = new Persona(
    document.getElementById('nombre').value,
    document.getElementById('apellido').value,
    document.getElementById('email').value,
    document.getElementById('cedula').value,
    document.getElementById('rut').value,
    document.getElementById('contrasena').value
);

const response = await fetch(`${URL}/${searchPersona}`,{
    method: 'PUT',
    headers: {'Content-Type':'applications/json',},
});