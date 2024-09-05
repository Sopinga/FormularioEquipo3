import { obtenerParams } from "../borrar/complemento";

const URL = 'http://localhost:3000'

const Persona = {
    contrasena: password.value,
    repetirContrasena: confirmPassword.value,
    cedula: cedula.value,
    nombre: nombre.value,
    apellido: apellido.value,
    email: email.value,
    rut: rut.value,
};

const person = new Persona(
    document.getElementById('nombre').value,
    document.getElementById('apellido').value,
    document.getElementById('email').value,
    document.getElementById('cedula').value,
    document.getElementById('rut').value,
    document.getElementById('contrasena').value
);

const response = await fetch(`${URL}/${searchPersona}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'applications/json', },
});