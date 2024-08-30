const fastify = require('fastify')({ logger: true });

let personas = [];

// Ruta para manejar el formulario y guardar los datos
fastify.post('/api/form', async (request, reply) => {
    const nuevaPersona = request.body;
    personas.push(nuevaPersona);
    reply.send({ status: 'success', message: 'Persona guardada correctamente' });
});

// Ruta para obtener todas las personas
fastify.get('/api/personas', async (request, reply) => {
    reply.send(personas);
});

// Inicia el servidor
fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`Servidor escuchando en ${address}`);
});
