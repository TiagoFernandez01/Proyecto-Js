const boton =document.getElementById('botonEnviar');
const enviarFormulario =() => {
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let mensaje = document.getElementById('mensaje').value;
    let numero = 541121559564;
    let win = window.open(`https://wa.me/${numero}?text=Hola%20mi%20nombre%20es%20${nombre}%20${apellido}, Busco asesorarme:%20${mensaje}`, '_blank');
}

boton.addEventListener('click' , enviarFormulario)
