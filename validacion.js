const formulario = document.getElementById("formulario");
const usuario = document.getElementById("usuario");
const password = document.getElementById("password");

const errorUsuario = document.getElementById("errorUsuario");
const errorPassword = document.getElementById("errorPassword");
const contador = document.getElementById("contador");
const mensajeEnvio = document.getElementById("mensajeEnvio");
const togglePassword = document.getElementById("togglePassword");

let intentos = 0;
let bloqueado = false;

// ---------------- VALIDAR USUARIO ----------------
function validarUsuario() {
    const regex = /^[a-zA-Z0-9.-]+$/;

    if (usuario.value.length < 3) {
        errorUsuario.textContent = "El usuario debe tener mínimo 3 caracteres.";
        errorUsuario.style.color = "red";
        return false;
    }

    if (!regex.test(usuario.value)) {
        errorUsuario.textContent = "Solo se permiten letras, números, puntos y guiones.";
        errorUsuario.style.color = "red";
        return false;
    }

    errorUsuario.textContent = "Usuario válido.";
    errorUsuario.style.color = "green";
    return true;
}

// ---------------- VALIDAR CONTRASEÑA ----------------
function validarPassword() {
    const regexFuerte = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\W]).{10,}$/;

    if (!regexFuerte.test(password.value)) {
        errorPassword.textContent = "Debe tener mínimo 10 caracteres, 1 mayúscula, 1 número y 1 símbolo.";
        errorPassword.style.color = "red";
        return false;
    }

    errorPassword.textContent = "Contraseña fuerte.";
    errorPassword.style.color = "green";
    return true;
}

// ---------------- MOSTRAR / OCULTAR PASSWORD ----------------
togglePassword.addEventListener("click", function () {
    if (password.type === "password") {
        password.type = "text";
        this.textContent = "Ocultar";
    } else {
        password.type = "password";
        this.textContent = "Mostrar";
    }
});

// ---------------- CONTADOR EN TIEMPO REAL ----------------
password.addEventListener("input", function () {
    contador.textContent = "Caracteres: " + password.value.length;
});

// ---------------- VALIDACIONES EN TIEMPO REAL ----------------
usuario.addEventListener("input", validarUsuario);
password.addEventListener("input", validarPassword);

// ---------------- BLOQUEO DESPUÉS DE 3 INTENTOS ----------------
function bloquearFormulario() {
    bloqueado = true;
    mensajeEnvio.textContent = "Demasiados intentos. Formulario bloqueado 30 segundos.";
    mensajeEnvio.style.color = "red";

    formulario.querySelector("button").disabled = true;

    setTimeout(() => {
        bloqueado = false;
        intentos = 0;
        formulario.querySelector("button").disabled = false;
        mensajeEnvio.textContent = "Formulario desbloqueado.";
        mensajeEnvio.style.color = "green";
    }, 30000);
}

// ---------------- ENVÍO DEL FORMULARIO ----------------
formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    if (bloqueado) return;

    const usuarioValido = validarUsuario();
    const passwordValido = validarPassword();

    if (usuarioValido && passwordValido) {
        mensajeEnvio.textContent = "Formulario enviado correctamente.";
        mensajeEnvio.style.color = "green";

        formulario.reset();
        contador.textContent = "";
        intentos = 0;
    } else {
        intentos++;
        mensajeEnvio.textContent = "Error en los campos.";
        mensajeEnvio.style.color = "red";

        if (intentos >= 3) {
            bloquearFormulario();
        }
    }
});
