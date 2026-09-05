// s17 login  conecta el formulario con la api 

const fromLogin =document.querySelector('#form-login');

fromLogin.addEventListener('submit',async function (evento) {
    evento.preventDefault();
    
    document.querySelector('#error-login-email').textContent = '';
    document.querySelector('#error-login-password').textContent = '';

    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value;

    if (!email) {
        document.querySelector('#error-login-email').textContent = 'Ingresa tu correo';
        return;
    }
    if (!password) {
        document.querySelector('#error-login-password').textContent = 'Ingresa tu contraseña';
        return;
    }

    try{
        const respuesta =await fetch('http://localhost:3000/api/auth/login',{
            method: 'POST' ,
            headers: {'content-Type' : 'application/json'},
            body : JSON.stringify({email: email, password: password})
        });

        const datos = await respuesta.json();

        if(!respuesta.ok) {
            document.querySelector('#error-login-email').textContent =
            datos.error || 'Correo o contraseña incorrectos';
            return;
        }

        localStorage.setItem('token',datos.token);
        localStorage.setItem('usuario-nombre',datos.nombre);


        const exito = document.querySelector('#logon-exito');
        exito.innerHTML = '<div style="background:#dcfce7;boder:1px solid #bbf7d0;border-radius:12px;padding:20px;">'
        + '<p style="color:#15803d;font-weight:700;">✅ +Bienvenido, ' + datos.nombre + '</p></div>';
        exito.style.display = 'block';
        fromLogin.reset();


    } catch(error) {
        document.querySelector('#error-login-email').textContent =
        'No se pudo conectar. Verifica que npm run dev este corriendo.';
    }
});