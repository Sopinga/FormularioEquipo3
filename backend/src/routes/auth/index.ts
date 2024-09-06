import { FastifyPluginAsync } from 'fastify';

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post('/login', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    email: { type:"string",format:"email"},
                    password: { type:"string"}
                },
                required: ['email', 'password']
            },
        },
    });
        handler: async (request, reply) {
            const { email, password } = request.body as {
                email: string;
                password: string;
            };
            if (email !== "famalugani@gmail.com") {
                reply.unauthorized("Invalid email");
            }
            const token = fastify.jwt.sign({
                email,
                id: 1,
                roles: ['admin', 'user'],
            });
            reply.send({ token });
    }
    fastify.post('/register', async (request, reply) {
        // Your register logic here
    });
};