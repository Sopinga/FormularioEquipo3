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

    if (!persona.edad || persona.edad < 0) {
        return res.status(400).json({ error: 'Edad inválida' });
    }

    if (!persona.apellido || persona.apellido.length < 2) {
        return res.status(400).json({ error: 'Apellido inválido' });
    }

    if (!persona.nombre || persona.nombre.length < 2) {
        return res.status(400).json({ error: 'Nombre inválido' });
    }

    if (!persona.email || !persona.email.includes('@')) {
        return res.status(400).json({ error: 'Email inválido' });
    }

    if (!persona.email || persona.email.length < 5) {
        return res.status(400).json({ error: 'Email inválido' });
    }

    if (!persona.cedula || persona.cedula.length === 8) {
        return res.status(400).json({ error: 'Cédula inválida' });
    }

    if (!persona.rut || persona.rut.length === 12) {
        return res.status(400).json({ error: 'RUT debe contar con 12 digitos' });
    }

    if (!persona.password || persona.password.length < 6) {
        return res.status(400).json({ error: 'Password inválido' });
    }

    if (!persona.confirmarPassword || persona.confirmarPassword !== persona.password) {
        return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    if (!validarCedulaUruguaya(persona.cedula)) {
        return res.status(400).json({ error: 'Cédula inválida' });
    }

    if (!validarRutUruguayo(persona.rut)) {
        return res.status(400).json({ error: 'RUT inválido' });
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
