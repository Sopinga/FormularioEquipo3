create table people(
    id_persona serial primary key,
    nombre text not null,
    apellido text not null,
    email text not null unique,
    cedula text not null unique,
    rut bigint not null unique,
    contrasena text not null,
)