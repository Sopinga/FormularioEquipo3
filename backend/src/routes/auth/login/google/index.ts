import type { FastifyInstance, FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import type { AppOptions } from './../../../../app.ts';
import { query } from "./../../../../services/database.js";


const googleRoutes: FastifyPluginAsync = async (
    fastify: FastifyInstance,
    opts: AppOptions
): Promise<void> => {

    fastify.get('/callback', async function (request: FastifyRequest, reply: FastifyReply) {
        console.log("Obteniendo token");
        try {
            // Obtiene el token de Google OAuth2
            const googletoken = await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request);

            console.log({ googletoken });

            const userinfo = await fastify.googleOAuth2.userinfo(googletoken.token.access_token);

            // Convertir la respuesta en un string y luego en un objeto para manejar los datos
            const parsedUserinfo = JSON.parse(JSON.stringify(userinfo));

            const email = parsedUserinfo.email;

            // Verifica si el correo electrónico existe en la base de datos
            const res = await query(`SELECT id, email FROM personas WHERE email = '${email}'`);

            if (res.rows.length === 0) {
                return reply.code(404).send({ error: 'User not found' });
            }

            // Redirige al usuario a la página de listado después del login con Google
            reply.redirect('https://localhost/listado/verTodo/index.html');
        } catch (error) {
            console.error('Error al obtener el token de acceso:', error);
            reply.status(500).send({ error: 'Error al procesar la autenticación' });
        }
    });
};

export default googleRoutes;
