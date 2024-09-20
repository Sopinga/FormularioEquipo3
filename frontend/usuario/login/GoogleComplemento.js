
// Manejador del evento submit del formulario
document.getElementById('btnGoogle').addEventListener('click', async () => {

    try {//una vez que tiene los dstos
        window.alert("obteniendo datos")
        const googleInfo = await getGoogleInfo();
        console.log("datos obtenidos", googleInfo)
        //si se obtienen bien
        if (googleInfo.get('token')) {
            //hace el login
            await loginWithGoogle(googleInfo);
            window.alert('Login hecho exitosamente');
            document.dispatchEvent(new Event('authChanged'));
            window.location.href = '../../listado/verTodos/index.html';
        } else {
            console.error('No se encontró el token en la URL');
        }
    } catch (error) {
        console.error('No pudimos procesar tu login:', error);

    }
});


//tomamos los datos de la url
async function getGoogleInfo() {
    // Obtener los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);

    return urlParams;
};
async function loginWithGoogle(googleInfo) {
    try {
        // Verificar si el token existe
        if (googleInfo) {
            // Extraer el token del parámetro 'token'
            const googleToken = googleInfo.get('token');
            // Almacenar el token en localStorage
            localStorage.setItem('token', googleToken);
            // Extraer el usuario del parametro 'user'
            const googleUser = googleInfo.get('user');
            // Almacenar el usuario en localStorage
            localStorage.setItem('user', googleUser);
        } else {
            // Manejar el caso en que no haya token en la URL
            console.error('Login con google no disponible');
        }
    } catch (error) {
        console.error('Google login error:', error);
        throw error;
    }
};
window.onload = handleGoogleLogin;
