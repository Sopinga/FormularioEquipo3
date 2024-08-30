// index.js
const fastify = require('fastify')({ logger: true })
const fs = require('fs')
const path = require('path')

// Definir una ruta GET para probar el servidor
fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})

// Definir una ruta POST para recibir la información de 'persona'
fastify.post('/persona', async (request, reply) => {
    const persona = request.body

    // Guardar la información en un archivo JSON
    const filePath = path.join(__dirname, 'data', 'personas.json')

    // Leer el archivo existente
    let personas = []
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath)
        personas = JSON.parse(data)
    }

    // Añadir la nueva persona
    personas.push(persona)

    // Guardar los datos actualizados en el archivo
    fs.writeFileSync(filePath, JSON.stringify(personas, null, 2))

    // Responder con un mensaje de éxito
    reply.send({ status: 'success', message: 'Persona guardada exitosamente' })
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
