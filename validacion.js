let usuario = document.getElementById("usuario")
let password = document.getElementById("password")
let mensaje = document.getElementById("mensaje")
let mensajePassword = document.getElementById("mensajePassword")

usuario.addEventListener("input", function () {

    this.value = this.value.toLowerCase()

    if (/[^a-z]/g.test(this.value)) {
        mensaje.textContent = "Esta tratando de ingresar un valor incorrecto"
        mensaje.style.color = "red"
        this.style.borderColor = "red"
    }
    else if (this.value.length > 0) {
        mensaje.textContent = "usuario correcto"
        mensaje.style.color = "green"
        this.style.borderColor = "green"
    }
    else {
        mensaje.textContent = "campo requerido"
        mensaje.style.color = "red"
    }

    this.value = this.value.replace(/[^a-z]/g, "")
})

password.addEventListener("input", function () {

    if (this.value.length < 10) {
        mensajePassword.textContent = "contraseña no valida"
        mensajePassword.style.color = "red"
        this.style.borderColor = "red"
    }
    else {
        mensajePassword.textContent = "contraseña valida"
        mensajePassword.style.color = "green"
        this.style.borderColor = "green"
    }

})
