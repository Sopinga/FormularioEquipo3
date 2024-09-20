function getUserDataFromURL() {
    // Obtener los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);

    // Extraer los valores de los parámetros
    const email = urlParams.get('email');
    const nombre2 = urlParams.get('given_name');
    const apellido = urlParams.get('family_name');

    // Si no hay datos en la URL, mostrar un error
    if (!email || !nombre2 || !apellido) {
        console.error('No se han encontrado los datos esperados en la URL');
        return null;
    }

    // Retornar los datos extraídos directamente
    return { email, nombre2, apellido };
}

// Ejecutar la función cuando la página se cargue
window.addEventListener('DOMContentLoaded', () => {
    // Obtener la información del usuario desde la URL
    const userData = getUserDataFromURL();

    if (!userData) {
        console.error('No valid user data found');
        return;
    }

    // Rellenar los campos con la información del usuario
    nombre.value = userData.nombre2 || '';
    email.value = userData.email || '';
    //hay cuentas que no tienen apellido
    if (!apellido.value === "undefined") {
        apellido.value = userData.apellido || '';
    } else {
        console.log("Tu cuenta no tiene un apellido registrado")
    }

});



document.getElementById('validateBtn').addEventListener('click', async function () {
    const nombre = document.getElementById('nombre');
    const nombre2 = document.getElementById('nombre2');
    const apellido = document.getElementById('apellido');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const email = document.getElementById('email');
    const cedula = document.getElementById('cedula');
    const rut = document.getElementById('rut');

    const nombreError = document.getElementById('nombreError');
    const nombr2Error = document.getElementById('nombre2Error');
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
    if (nombre.value.length < 2 || nombre.value.length > 50) {
        nombreError.textContent = 'El nombre es demasiado corto o largo.';
        nombreError.style.display = 'block';
        isValid = false;
    }

    if (nombre2.value.trim() === '') {
        nombre2Error.textContent = 'El nombre es obligatorio.';
        nombre2Error.style.display = 'block';
        isValid = false;
    }
    if (nombre2.value.length < 2 || nombre2.value.length > 50) {
        nombre2Error.textContent = 'El nombre es demasiado corto o largo.';
        nombre2Error.style.display = 'block';
        isValid = false;
    }
    if (apellido.value.trim() === '') {
        apellidoError.textContent = 'El apellido es obligatorio.';
        apellidoError.style.display = 'block';
        isValid = false;
    }
    if (apellido.value.length < 2 || apellido.value.length > 50) {
        nombreError.textContent = 'El nombre es demasiado corto o largo.';
        nombreError.style.display = 'block';
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
    } else if (!/[A-Z]/.test(password.value)) {
        passwordError.textContent = 'La contraseña debe tener al menos una mayuscula.';
        passwordError.style.display = 'block';
        isValid = false;
    }
    else if (!/[a-z]/.test(password.value)) {
        passwordError.textContent = 'La contraseña debe tener al menos una minuscula.';
        passwordError.style.display = 'block';
        isValid = false;
    } else if (!/[0-9]/.test(password.value)) {
        passwordError.textContent = 'La contraseña debe tener al menos un número.';
        passwordError.style.display = 'block';
        isValid = false;
    } else if (!/[!@#$%^&*_-]/.test(password.value)) {
        passwordError.textContent = 'La contraseña debe tener al menos un carácter especial (!@#$%^&*_-)';
        passwordError.style.display = 'block';
        isValid = false;
    }

    if (confirmPassword.value.trim() === '') {
        passwordError.textContent = 'La contraseña es obligatoria.';
        passwordError.style.display = 'block';
        isValid = false;
    } else if (confirmPassword.value.length < 8) {
        passwordError.textContent = 'La contraseña debe tener al menos 8 caracteres.';
        passwordError.style.display = 'block';
        isValid = false;
    } else if (!/[A-Z]/.test(confirmPassword.value)) {
        passwordError.textContent = 'La contraseña debe tener al menos una mayuscula.';
        passwordError.style.display = 'block';
        isValid = false;
    }
    else if (!/[a-z]/.test(confirmPassword.value)) {
        passwordError.textContent = 'La contraseña debe tener al menos una minuscula.';
        passwordError.style.display = 'block';
        isValid = false;
    } else if (!/[0-9]/.test(confirmPassword.value)) {
        passwordError.textContent = 'La contraseña debe tener al menos un número.';
        passwordError.style.display = 'block';
        isValid = false;
    } else if (!/[!@#$%^&*_-]/.test(confirmPassword.value)) {
        passwordError.textContent = 'La contraseña debe tener al menos un carácter especial (!@#$%^&*_-)';
        passwordError.style.display = 'block';
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
        cedulaError.textContent = 'La cedula debe de tener 8 digitos, separados por puntos y un guion.';
        cedulaError.style.display = 'block';
        isValid = false;
    } else if (!validarCedulaUruguaya(cedula.value)) {
        cedulaError.textContent = 'La cédula es incorrecta, intenta de nuevo.';
        cedulaError.style.display = 'block';
        isValid = false;
    }

    // Validación específica para el RUT uruguayo (12 dígitos + verificador)
    if (rut.value.trim() === '') {
        rutError.textContent = 'El RUT es obligatorio.';
        rutError.style.display = 'block';
        isValid = false;
    } else if (validarRutUruguayo(rut.value)) {
        rutError.textContent = 'El RUT debe tener 12 dígitos.';
        rutError.style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        const nuevaPersona = {
            nombre: nombre.value,
            nombre2: nombre2.value,
            apellido: apellido.value,
            email: email.value,
            contrasena: password.value,
            cedula: cedula.value,
            rut: rut.value,


        };
        try {
            const responseAlta = await fetch('https://localhost/backend/personas', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevaPersona),

            });

            if (responseAlta.ok) {
                alert('Todos los campos son válidos.');
                window.location.href = '../../index.html'
            } else {
                alert('Error al registrar la persona');
            }
        } catch (error) {
            console.error('Error al registrar la persona:', error);
            alert('Error al registrar la persona');
        }

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
};
function verificadorRut(rut) {
    const pesos = [2, 9, 8, 7, 6, 3, 4];
    let suma = 0;

    // Convertir el RUT a un string para procesarlo dígito por dígito
    const rutStr = rut.toString();

    // Recorrer el RUT en sentido inverso (excepto el dígito verificador)
    for (let i = 0; i < rutStr.length; i++) {
        const digito = parseInt(rutStr.charAt(rutStr.length - 1 - i), 10);
        suma += digito * pesos[i];
    }

    // Calcular el módulo 11
    const modulo = suma % 11;
    const digitoVerificador = modulo === 0 ? 0 : modulo === 1 ? 'X' : 11 - modulo;

    return digitoVerificador;
}
function validarRutUruguayo(rut) {
    if (/^\d{12}$/.test(rut)) {
        const rutWithoutVerifier = rut.slice(0, -1); // Take the first 11 digits
        const verifyingDigit = verificadorRut(rutWithoutVerifier);
        const actualVerifier = parseInt(rut.charAt(11)); // Get the last digit (verifier)
        console.log("Comprobando si el digito verificador es correcto.")
        return verifyingDigit === actualVerifier;
    }
    console.log("El rut no cumple con el patron.")
    return false;
}