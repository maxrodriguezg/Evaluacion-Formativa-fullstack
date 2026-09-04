const formRecuperar = document.getElementById("formRecuperar");
const mensajeContenedor = document.getElementById("mensajeRecuperar");

formRecuperar.addEventListener("submit", function(evento) {
    evento.preventDefault();
    const correo = document.getElementById("email").value.trim();
    const esDuoc = /^[^\s@]+@duoc\.cl$/i;

    if (!esDuoc.test(correo)) {
        mensajeContenedor.innerHTML = `<div class="alert alert-danger py-2 small">El correo debe terminar en @duoc.cl</div>`;
        return
    } 
    const usuarioRegistrado = JSON.parse(localStorage.getItem("usuarioRegistrado"));

    if (!usuarioRegistrado || usuarioRegistrado.correo.toLowerCase() !== correo.toLowerCase()) {
        mensajeContenedor.innerHTML = `<div class="alert alert-danger py-2 small text-center">El correo ingresado no está registrado en el sistema.</div>`;
        return;
    }
    else
        mensajeContenedor.innerHTML = `<div class="alert alert-success py-2 small text-center">¡Instrucciones enviadas! Redirigiendo al inicio de sesión...</div>`;
        formRecuperar.reset();
            setTimeout(function() {
                window.location.href = "login.html";
            }, 1500);
    }
);