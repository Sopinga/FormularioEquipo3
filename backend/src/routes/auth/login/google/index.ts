import type { FastifyInstance, FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import type { AppOptions } from './../../../../app.ts';
import { query } from "./../../../../services/database.js";
import got from 'got';
import { PersonaType } from '../../../../tipos/persona.js';

interface GoogleUser {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}

const googleRoutes: FastifyPluginAsync = async (
    fastify: FastifyInstance,
    opts: AppOptions
): Promise<void> => {

    fastify.get('/callback', async function (request: FastifyRequest, reply: FastifyReply) {
        console.log("Obteniendo token");

        // Obtiene el token de Google OAuth2
        const { token: googleToken } = await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

        console.log({ googleToken });

        // Obtiene la información con el token que recibimos
        const userInfo: GoogleUser = await got
            .get('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: {
                    Authorization: `Bearer ${googleToken.access_token}`,
                },
            })
            .json();
        console.log({ userInfo });

        // Verifica si el correo electrónico existe en la base de datos
        const res = await query('SELECT * FROM personas WHERE email=$1', [userInfo.email]);

        if (res.rows.length === 0) {
            return reply.code(404).send({ error: 'User not found' });
        }
        const persona: PersonaType = res.rows[0];
        const payload = {
            id: persona.id,
            email: persona.email,
            roles: ["admin", "user"],
        };
        const token = fastify.jwt.sign(payload);
        const url = `${process.env.FRONTEND_URL}/index.html?token=${token}`;
        return reply.redirect(url);
    });
};

export default googleRoutes;
