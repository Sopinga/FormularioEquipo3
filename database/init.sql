create extension if not exists pgcrypto
create table if not exists people(
    id_persona serial primary key,
    nombre text not null,
    apellido text not null,
    email text not null unique,
    cedula text not null unique,
    rut bigint not null unique,
    contrasena text not null,
)

instert into poeple (nombre, apellido, email, cedula, rut, contrasena)
    values("pepito","rodriguez","roberto@hotmail.com","5.440.395-7",214849650014, crypt(Juancito!8442, gen_salt("bf")));