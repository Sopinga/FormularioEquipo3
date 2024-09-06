import { FastifyReply, FastifyRequest } from "fastify";

export const validateCedula = async (request: FastifyRequest, reply: FastifyReply) => {
    const { cedula } = request.body as { cedula: string };
    if (!VerifyingDigit(cedula)) {
        return reply.status(400).send({ message: 'Cédula no válida' });
    }
}


function VerifyingDigit(cedula: string) {
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

function isValidFormatId(id: string) {
    return /^\d{1}\.\d{3}\.\d{3}-\d{1}$/.test(id);
}

function isValidId(id: string) {
    console.log("Cédula ingresada:", id);
    if (isValidFormatId(id)) {
        if (VerifyingDigit(id)) {
            return true
        };
    }
    return false;
}

export default isValidId;