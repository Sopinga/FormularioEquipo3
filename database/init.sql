CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS personas (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    cedula TEXT NOT NULL UNIQUE,
    rut BIGINT NOT NULL UNIQUE,
    contrasena TEXT NOT NULL
);

INSERT INTO personas (nombre, apellido, email, cedula, rut, contrasena)
VALUES ('Pepito', 'Rodriguez', 'roberto@hotmail.com', '5.440.395-7', 214849650014, crypt('Juancito!8442', gen_salt('bf')));
VALUES ('Pepita', 'Perez', 'perezo@hotmail.com', '5.479.508-3', 18023, crypt('Juanita!8442', gen_salt('bf')));