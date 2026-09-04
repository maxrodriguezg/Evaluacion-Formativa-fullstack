const formRegistro = document.getElementById("formRegistro");
const mensajeError = document.getElementById("mensajeError");

function ValidacionesRegistro() {

    let errores = [];

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("email").value.trim();
    const correoRepetir = document.getElementById("emailRepetir").value.trim();
    const contraseña = document.getElementById("contraseña").value;
    const contraseñaRepetir = document.getElementById("contraseñaRepetir").value;
    const telefono = document.getElementById("telefono").value.trim();

    const generos = document.querySelectorAll('input[type="checkbox"]:checked');

    // Validacion nombre
    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if(nombre == ""){
        errores.push("El nombre no puede estar vacio, ES OBLIGATORIO ");
    } else if (nombre.length > 100) { 
        errores.push("El nombre es muy largo, El maximo es de 100 caracteres");
    } else if (!soloLetras.test(nombre)){
        errores.push("El nombre solo debe contener letras");
    }

    // Validar correo
    const esDuoc = /^[^\s@]+@duoc\.cl$/i;
    if(correo == ""){
        errores.push("El correo no puede estar vacio, ES OBLIGATORIO ");
    } else if (!esDuoc.test(correo)){ 
        errores.push("El correo debe terminar obligatoriamente en @duoc.cl.");
    } else if (correo.length > 60) { 
        errores.push("El correo no puede tener más de 60 caracteres.");
    }

    if (correo !== correoRepetir) {
        errores.push("Los correos electrónicos no coinciden.");
    }

    // Validar contraseña
    if (contraseña == "") {
        errores.push("La contraseña no puede estar vacía, ES OBLIGATORIA.");
    } else if (contraseña.length < 10) {
        errores.push("La contraseña debe tener mínimo 10 caracteres.");
    } else if ((contraseña.match(/[A-Z]/g) || []).length < 2) {
        errores.push("La contraseña debe tener al menos 2 letras mayúsculas.");
    } else if (!/[a-z]/.test(contraseña)) {
        errores.push("La contraseña debe tener al menos una minúscula.");
    } else if (!/[0-9]/.test(contraseña)) {
        errores.push("La contraseña debe tener al menos un número.");
    } else if (!/[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(contraseña)) {
        errores.push("La contraseña debe tener al menos un carácter especial.");
    }   
    
    if (contraseña !== contraseñaRepetir) {
        errores.push("Las contraseñas no coinciden.");
    }

    // Validar telefono
    if (telefono !== "") { 
        if (isNaN(telefono)) {
            errores.push("El telefono debe contener solo numeros");
        }
    }
    
    if (generos.length === 0) {
        errores.push("selecciona al menos un género favorito");
    }

    if (errores.length > 0) {
        let mensajeHTML = "<ul style='color: red;'>";
        for (let i = 0; i < errores.length; i++) {
            mensajeHTML += "<li>" + errores[i] + "</li>";
        }
        mensajeHTML += "</ul>";
        mensajeError.innerHTML = mensajeHTML;
    } else {
        let generosSeleccionados = [];
        generos.forEach(function(checkbox) {
            generosSeleccionados.push(checkbox.value);
        });

        const nuevoUsuario = {
            nombre: nombre,
            correo: correo,
            contraseña: contraseña,
            telefono: telefono,
            generos: generosSeleccionados
        };

        localStorage.setItem("usuarioRegistrado", JSON.stringify(nuevoUsuario));

        mensajeError.innerHTML = "<p style='color: green;'><strong>¡Registro exitoso! Redirigiendo al Login...</strong></p>";
        formRegistro.reset();

        setTimeout(function() {
            window.location.href = "login.html";
        }, 1500);
    }
}

formRegistro.addEventListener("submit", function(evento){
    evento.preventDefault();
    ValidacionesRegistro();
});