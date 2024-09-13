import jwt, { FastifyJWTOptions } from '@fastify/jwt';
import fp from "fastify-plugin";
import { FastifyReply, FastifyRequest } from 'fastify';

const jwtOptions: FastifyJWTOptions = {
    secret: "MYSUPERSECRET",
};

export default fp<FastifyJWTOptions>(async (fastify) => {
    fastify.register(jwt, jwtOptions);
    fastify.decorate("authenticate", async function (request: FastifyRequest, resply: FastifyReply) {
        try {
            await request.jwtVerify()

        } catch (err) {
            resply.send(err)
        }
    })
});
/*

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    fastify.post('/login', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    email: { type: "string", format: "email" },
                    password: { type: "string" }
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
};*/