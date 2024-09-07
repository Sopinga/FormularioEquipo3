document.getElementById('validateBtn').addEventListener('click', async function () {
    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const email = document.getElementById('email');
    const cedula = document.getElementById('cedula');
    const rut = document.getElementById('rut');

    const nombreError = document.getElementById('nombreError');
    const apellidoError = document.getElementById('apellidoError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const emailError = document.getElementById('emailError');
    const cedulaError = document.getElementById('cedulaError');
    const rutError = document.getElementById('rutError');

    // Reset errors
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(el => el.style.display = 'none');

    let isValid = true;

    // Validations
    if (nombre.value.trim() === '') {
        nombreError.textContent = 'El nombre es obligatorio.';
        nombreError.style.display = 'block';
        isValid = false;
    }

    if (apellido.value.trim() === '') {
        apellidoError.textContent = 'El apellido es obligatorio.';
        apellidoError.style.display = 'block';
        isValid = false;
    }

    if (password.value.trim() === '') {
        passwordError.textContent = 'La contraseña es obligatoria.';
        passwordError.style.display = 'block';
        isValid = false;
    } else if (password.value.length < 6) {
        passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres.';
        passwordError.style.display = 'block';
        isValid = false;
    }

    if (confirmPassword.value.trim() === '') {
        confirmPasswordError.textContent = 'Debes confirmar la contraseña.';
        confirmPasswordError.style.display = 'block';
        isValid = false;
    } else if (confirmPassword.value !== password.value) {
        confirmPasswordError.textContent = 'Las contraseñas no coinciden.';
        confirmPasswordError.style.display = 'block';
        isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (email.value.trim() === '') {
        emailError.textContent = 'El correo electrónico es obligatorio.';
        emailError.style.display = 'block';
        isValid = false;
    } else if (!emailPattern.test(email.value)) {
        emailError.textContent = 'El correo electrónico no es válido.';
        emailError.style.display = 'block';
        isValid = false;
    }

    const cedulaPattern = /^\d{1}\.\d{3}\.\d{3}-\d{1}$/;
    if (cedula.value.trim() === '') {
        cedulaError.textContent = 'La cédula es obligatoria.';
        cedulaError.style.display = 'block';
        isValid = false;
    } else if (!cedulaPattern.test(cedula.value)) {
        rutError.textContent = 'El RUT debe tener 12 dígitos.';
        rutError.style.display = 'block';
        isValid = false;
    } else if (!validarCedulaUruguaya(cedula.value)) {
        cedulaError.textContent = 'La cédula es incorrecta, intenta de nuevo.';
        cedulaError.style.display = 'block';
        isValid = false;
    }

    // Validación específica para el RUT uruguayo (12 dígitos + verificador)
    const rutPattern = /^\d{12}$/;
    if (rut.value.trim() === '') {
        rutError.textContent = 'El RUT es obligatorio.';
        rutError.style.display = 'block';
        isValid = false;
    } else if (!rutPattern.test(rut.value)) {
        rutError.textContent = 'El RUT debe tener 12 dígitos.';
        rutError.style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        const nuevaPersona = {
            nombre: nombre.value,
            apellido: apellido.value,
            email: email.value,
            cedula: cedula.value,
            rut: rut.value,
            contrasena: password.value,
            repetirContrasena: confirmPassword.value,
        };
        const responseAlta = await fetch("http://localhost:3000/personas", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevaPersona),

        });

        if (responseAlta.ok) {
            window.location.href = '../cards/datos.html'
        }
        alert('Todos los campos son válidos.');
    }
});

function validarCedulaUruguaya(cedula) {

    // Eliminar puntos y guiones
    cedula = cedula.replace(/\./g, '').replace(/-/g, '');

    // La cédula debe tener 7 u 8 dígitos (sin contar el dígito verificador)
    if (cedula.length < 7 || cedula.length > 8) {
        return false;
    }

    // Obtener el dígito verificador
    let digitoVerificador = parseInt(cedula.slice(-1));

    // Completar con ceros a la izquierda si la cédula tiene menos de 8 dígitos
    cedula = cedula.padStart(8, '0');

    // Constantes para el algoritmo de validación
    let coeficientes = [2, 9, 8, 7, 6, 3, 4];
    let suma = 0;

    // Calcular la suma ponderada de los primeros 7 dígitos
    for (let i = 0; i < 7; i++) {
        suma += parseInt(cedula[i]) * coeficientes[i];
    }

    // Calcular el módulo 10 de la suma
    let modulo = suma % 10;

    // Determinar el dígito verificador correcto
    let digitoCorrecto = modulo === 0 ? 0 : 10 - modulo;

    // Verificar si el dígito verificador es correcto
    return digitoCorrecto === digitoVerificador;
}


