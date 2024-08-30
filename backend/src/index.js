const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware para parsear JSON

// Simulamos una base de datos en memoria
let personas = [];

// Ruta para recibir y guardar el objeto Persona
app.post('/api/personas', (req, res) => {
    const persona = req.body;

    if (!persona.nombre || !persona.edad) {
        return res.status(400).json({ error: 'Nombre y edad son requeridos' });
    }

    personas.push(persona);
    res.status(201).json({ mensaje: 'Persona guardada exitosamente', persona });
});

// Ruta para obtener todas las personas
app.get('/api/personas', (req, res) => {
    res.json(personas);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
