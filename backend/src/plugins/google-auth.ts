/*import oauthPlugin, { FastifyOAuth2Options } from "@fastify/oauth2";
import fastify from "fastify";
import fp from "fastify-plugin";

export default fp(async(fastify)) => {
    const googleOAuth2Options: FastifyOAuth2Options = {
        name: 'googleOAuth2',
        scope: ['profile', 'email'],
        credentials: {
            client: {
                id: process.env.GOOGLE_ID || " ",
                secret: '<CLIENT_SECRET>',
            },
            auth: oauthPlugin.fastifyOauth2.GOOGLE_CONFIGURATION,
        },
        startRedirectPath: '/auth/login/google',
        callbackUri: 'http://localhost:3000/login/google/callback',
        callbackUriParams: {
            // custom query param that will be passed to callbackUri
            access_type: 'offline', // will tell Google to send a refreshToken too
        },
        pkce: 'S256'
        // check if your provider supports PKCE, 
        // in case they do, 
        // use of this parameter is highly encouraged 
        // in order to prevent authorization code interception attacks
    }
};*/