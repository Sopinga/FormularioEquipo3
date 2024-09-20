import { FastifyPluginAsync } from "fastify";
import bcrypt from "bcrypt";
import { query } from "../../services/database.js";

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post("/login", {
        schema: {
            tags: ["auth"],
            body: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: { type: "string", format: "email" },
                    password: { type: "string" },
                },
            },
        },
        handler: async (request, reply) => {
            const { email, password } = request.body as { email: string, password: string };
            const res = await query(`SELECT id, email, password FROM personas WHERE email = '${email}'`);
            if (res.rows.length === 0) {
                reply.code(404).send({ message: 'Usuario no encontrado' });
                return;
            }
            const user = res.rows[0];

            // Asegúrate de esperar la comparación de bcrypt
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                reply.code(401).send({ message: 'Contraseña incorrecta' });
                return;
            }

            // Genera el token JWT
            const token = fastify.jwt.sign({ id: user.id });
            reply.send({ success: true, token, id: user.id });
        }
    });
};

export default auth;
