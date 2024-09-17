import { FastifyPluginAsync } from "fastify";
import { PersonaSchema, PersonaType } from "../../../tipos/persona.js";

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.get(
        "/",
        {
            schema: {
                response: {
                    200: {
                        description: "Datos del usuario en el token",
                        content: {
                            "application/json": {
                                schema: PersonaSchema,
                            },
                        },
                    },
                },
            },
            onRequest: [fastify.authenticate],
            handler: async function (request, reply) {
                const user = request.user as PersonaType;
                console.log({ user });
                return user;
            },
        }
    );
};

export default auth;
