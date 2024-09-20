document.getElementById('validateBtn').addEventListener('click', async function () {
    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const email = document.getElementById('email');
    const cedula = document.getElementById('cedula');
    const rut = document.getElementById('rut');
    const imagen = document.getElementById('miImagen');

    const nombreError = document.getElementById('nombreError');
    const apellidoError = document.getElementById('apellidoError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const emailError = document.getElementById('emailError');
    const cedulaError = document.getElementById('cedulaError');
    const rutError = document.getElementById('rutError');
    const imagenError = document.getElementById('imagenError'); 

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

    if (imagen.value.trim() === '') {
        imagenError.textContent = 'La imagen es obligatoria.';
        imagenError.style.display = 'block';
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
            apellido: apellido.value,
            email: email.value,
            contrasena: password.value,
            cedula: cedula.value,
            rut: rut.value,
            imagen: imagen.value


        };
        try {
            const responseAlta = await fetch('http://localhost/backend/personas', {
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

    function validateFile() {
      var fileInput = document.getElementById('miImagen');
      var filePath = fileInput.value;
      var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      var output = document.getElementById('output');
  
      if (!allowedExtensions.exec(filePath)) {
        imagenError.textContent = 'El archivo seleccionado no es una imagen.';
        imagenError.style.display = 'block';
        isValid = false;
        fileInput.value = '';
        output.src = '';
        return false;
      } else {
        imagenError.textContent = '';
        mostrarImagen(fileInput);
      }
    }
  
    function mostrarImagen(fileInput) {
      var output = document.getElementById('output');
      output.src = URL.createObjectURL(fileInput.files[0]);
      output.onload = function() {
        URL.revokeObjectURL(output.src); // free memory
      }
    }