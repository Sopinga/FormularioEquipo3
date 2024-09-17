import { FastifyReply, FastifyRequest } from "fastify";
import '@fastify/oauth2';

export interface authenticateFunction {
    (request: FastifyRequest, reply: FastifyReply): Promise<void>;
}



declare module 'fastify' {
    interface FastifyInstance {
        googleOAuth2: any;
    }
}


declare module "fastify" {
    interface FastifyInstance {
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
}