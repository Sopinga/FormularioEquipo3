// index.js
const fastify = require('fastify')({ logger: true })

// Ruta de prueba para ver si el servidor está funcionando
fastify.get('/', async (request, reply) => {
    return { message: 'Servidor funcionando correctamente' }
})

// Ruta POST para recibir datos de persona
fastify.post('/persona', async (request, reply) => {
    try {
        const persona = request.body

        // Simula el almacenamiento de datos, por ahora solo responde con un mensaje
        reply.send({ status: 'success', message: 'Persona recibida', persona })
    } catch (err) {
        fastify.log.error(err)
        reply.status(500).send({ status: 'error', message: 'Algo salió mal' })
    }
})

// Correr el servidor
const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' })
        fastify.log.info(`Server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
