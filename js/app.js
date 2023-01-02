// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

// Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');


// exprecion regular 
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


// funcion que conteiene todos los eventos 
eventListeners();
function eventListeners() {

    // cuando inciia la pagina 
    document.addEventListener("DOMContentLoaded", iniciarApp);

    //cam`pos del formulario 
    email.addEventListener("blur", validarFormulario);
    asunto.addEventListener("blur", validarFormulario);
    mensaje.addEventListener("blur", validarFormulario);

    // reinivia formulario 
    btnReset.addEventListener("click", resetearFormulario);


    //enviar email 
    //sumits generalmetnte empleados para enviar formularios 

    formulario.addEventListener("submit", enviarEmail);

}


//funciones funcionales 
function iniciarApp() {
    btnEnviar.disable = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

// validadndo el formulario {
function validarFormulario(e) {
    // --- > toma el vento --- > donde se hallar seleccionado .value obtiene lo qye se escribe y.leghtd ice la cantidad de datos del String


    if (e.target.value.length > 0) {
        //esta constante se creo mas avajo con puro js 
        const error = document.querySelector("p.error")
        if (error) {
            error.remove();
        }

        // s itiene contenido pasa a verde el vorde 
        e.target.classList.remove("border", "border-red-500");
        e.target.classList.add('border', 'border-green-500');
    } else {
        //si no tiene contenido entonces rojiodo
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
        // mostrar rrorr del formulario de email
    }

    //validamos si el email es valido 
    if (e.target.type === "email") {
        //El método test () prueba una coincidencia en una cadena--> devuelve valor true o false 
        if (er.test(e.target.value)) { // si es verdad que el valor ingresado se encuentra en la cadena de exprecion regular jala el codigo si no no pe 
            // elimina errores 

            //esta constante se creo mas avajo con puro js 
            const error = document.querySelector("p.error")
            if (error) {
                error.remove();
            }

            // si este esta bien entonces quitamos el vorde de roror y colocamos el verdecito 
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');;

        } else {
            e.target.classList.remove('border', 'border-green-500');;
            e.target.classList.add('border', 'border-red-500');
            // mostrar mensaje de error en gmail
            mostrarError("Email no valido");

        }

    }
    // realziando el respectivo envio del formulario si cumple eel utusurio en compeltar todos los campos 
   
    if( er.test( email.value ) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50')
    } 

}


//funcion msotrar error ()
function mostrarError(mensaje) {
    // crearemos codigo html en el proyecto 
    const mensajeError = document.createElement("p");
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');
    // le decimos a JS que le diga en el oido de html de manera sencual que clases de ".error" seleccionara para aplicar esta madre 
    const errores = document.querySelectorAll(".error");  // esta clase de error fue añadida arribita noma 

    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
}


// enviar el email 
function enviarEmail(e) {
    e.preventDefault();
    
    //msotrando el spinner animado 
    const spinner = document.querySelector("#spinner");
    // style para crear codigo css 
    spinner.style.display = "flex";
    //generando un set time aut para desaparecer  la animacion css y añadir el mensaje de enviado correctamente 
  
    setTimeout(() => {
        spinner.style.display = "none";
        const parrafo = document.createElement("p");
        parrafo.textContent = "El mensaje a sido enviado gratificantemente";
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');
        formulario.insertBefore(parrafo, spinner);

        // ELIMINAR LA RESPUESTA DEL MENSAJE EXITOSO 

        setTimeout(() => {
            parrafo.remove();
            resetearFormulario();
        }, 5000);
    }, 3000);

}

// Función que resetea el formulario
function resetearFormulario() {
    formulario.reset();
    iniciarApp();
}
