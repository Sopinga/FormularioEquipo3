// Función para verificar la contraseña y el email en el backend
async function login(email, password) {
    try {
        const response = await fetch(`https://localhost/backend/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        return data.token;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}

// Función para peticiones autenticadas
async function authenticatedFetch(url, options = {}) {
    // Obtengo el token del usuario
    const token = localStorage.getItem('token');
    if (!token) {
        // Si no es válido, lanza un error
        throw new Error('No se encontró un token autorizado');
    }

    // Añade el token al header
    const defaultOptions = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

    const mergedOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers,
        },
    };

    return fetch(url, mergedOptions);
}

// Manejador del evento submit del formulario
document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        await login(username, password);
        document.getElementById('error').textContent = 'Login realizado exitosamente.';
        window.location.href = '../verTodos/index.html'; // Cambia la ruta si es necesario
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error').textContent = 'Tus datos no coinciden, intenta nuevamente';
    }
});
