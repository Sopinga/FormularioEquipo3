import jwt, { FastifyJWTOptions } from '@fastify/jwt';
import fp from "fastify-plugin";

const jwtOptions: FastifyJWTOptions = {
    secret: "MYSUPERSECRET",
};

export default fp<FastifyJWTOptions>(async (fastify) => {
    fastify.register(jwt, jwtOptions);
});