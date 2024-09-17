CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS personas (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    nombre2 TEXT,
    apellido TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    cedula TEXT NOT NULL UNIQUE,
    rut BIGINT NOT NULL UNIQUE,
    contrasena TEXT NOT NULL
);

INSERT INTO personas (nombre, apellido, email, cedula, rut, contrasena)
    VALUES ('Pepito', 'Rodriguez', 'roberto@hotmail.com', '5.440.395-7', 214849650014, crypt('Juancito!8442', gen_salt('bf'))),
           ('Pepita', 'perez', 'perez@hotmail.com', '5.479.508-3', 160338520015, crypt('Pepita!8442', gen_salt('bf'))),
           ('jorge', 'lopez', 'lopez@hotmail.com', '3.306.549-7', 160237810018, crypt('Jorgito!8442', gen_salt('bf'))),
           ('jorgita', 'hernandez', 'hernandez@hotmail.com', '3.918.898-2', 160205570011, crypt('Jorgita!8442', gen_salt('bf')));
           
