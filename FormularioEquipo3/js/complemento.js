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

function validarRUT(rut) {
    // Elimina puntos y guiones del RUT
    rut = rut.replace(/\D/g, '');

    // Verifica que el RUT tenga exactamente 12 dígitos
    if (rut.length !== 12) return false;
    
    // Separa el número base del dígito verificador
    const numero = rut.slice(0, 11);
    const digitoVerificador = parseInt(rut.slice(11, 12), 10);
    
    // Cálculo del dígito verificador según el algoritmo estándar en Uruguay
    let suma = 0;
    const factores = [2, 9, 8, 7, 6, 3, 4, 2, 9, 8, 7]; // Factores de multiplicación
    
    for (let i = 0; i < numero.length; i++) {
      suma += parseInt(numero[i], 10) * factores[i];
    }
    
    const modulo = suma % 11;
    const calculado = modulo === 0 ? 0 : modulo === 1 ? 1 : 11 - modulo;
    
    // Verifica si el dígito verificador es correcto
    return calculado === digitoVerificador;
}