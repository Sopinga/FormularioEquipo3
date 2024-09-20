// Función para verificar la contraseña y el email en el backend
document.getElementById('btonLogin').addEventListener('click', async function (email, password) {
    const email = document.getElementById('mail').value;
    const password = document.getElementById('password').value;
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
        this.token = data.token;
        this.user = data.user;
        this.id = data.id;

        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('id', this.id);
        window.location.href = '../../listado/verTodos/index.html';
        return this.user;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
});


