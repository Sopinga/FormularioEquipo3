import { FastifyPluginAsync } from "fastify";
import bcrypt from "bcrypt";
import { query } from "../../../services/database.js";

const register: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post("/register", {
        schema: {
            tags: ["auth"],
            body: {
                type: "object",
                required: ["nombre", "nombre2", "apellido", "password", "email", "cedula", "rut"],
                properties: {
                    nombre: { type: "string" },
                    nombre2: { type: "string" },
                    apellido: { type: "string" },
                    password: { type: "string" },
                    email: { type: "string", format: "email" },
                    cedula: { type: "string" },
                    rut: { type: "string" },
                },
            },
        },
        handler: async (request, reply) => {
            const { nombre, nombre2, apellido, password, email, cedula, rut } = request.body as {
                nombre: string,
                nombre2: string,
                apellido: string,
                password: string,
                email: string,
                cedula: string,
                rut: string,
            };

            // Verifica si el email ya está registrado
            const res = await query(`SELECT id FROM personas WHERE email = '${email}'`);
            if (res.rows.length > 0) {
                return reply.code(400).send({ message: 'El correo electrónico ya está registrado' });
            }

            // Hashear la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Guardar el nuevo usuario en la base de datos
            await query(`INSERT INTO personas (nombre, nombre2, apellido, password, email, cedula, rut) VALUES ('${nombre}', '${nombre2}','${apellido}', '${hashedPassword}', '${email}', '${cedula}', '${rut}')`);

            reply.code(201).send({ message: 'Usuario registrado exitosamente' });
        }
    });
};

export default register;
