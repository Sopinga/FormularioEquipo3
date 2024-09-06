class Persona {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    cedula: number;
    rut: number;
    contrasena: string;
    repetirContrasena: string;


    constructor(nombre: string, apellido: string, email: string, cedula: number, rut: number, contrasena: string, repetirContrasena: string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.cedula = cedula;
        this.rut = rut;
        this.contrasena = contrasena;
        this.repetirContrasena = repetirContrasena;
    }
}
