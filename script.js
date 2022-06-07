Swal.fire({
    title: "Bienvenido!",
    text: "Te brindamos seguridad y rapidez, cotiza tu seguro y sacate las duadas."
});


let encabezado = document.getElementById("encabezado");



//creo array de objetos, cada uno con sus marcas

const marcas = [{
    nombre: "ducati",
},
{ nombre: "yamaha", },
{ nombre: "motomel", },
{ nombre: "honda" },
{ nombre: "zanella", },
{ nombre: "corven", },
{ nombre: "suzuki", },
{ nombre: "ktm", },
{ nombre: "beneilli", },
{ nombre: "gilera", },
{ nombre: "rouser", }];

//Ordeno el array alfabeticamente

marcas.sort();






//creo ARRAY de planes

const planes = [{
    planNombre: "basico",
},
{
    planNombre: "completo",
},
{
    planNombre: "premium",
}];

//array vacio para cargar datos de usuario

const usuarios = [];




let selectMarcas = document.getElementById("marcas");


//creo la opcion vacia
let opcionVacia = document.createElement("option");
opcionVacia.innerText = "--Seleccionar--";
opcionVacia.value = "";
selectMarcas.append(opcionVacia);




// Recorrido de array
marcas.forEach((marcas) => {


    let option = document.createElement("option");
    option.innerText = marcas.nombre;
    option.value = marcas.nombre;


    selectMarcas.append(option);
});



//agrego lista de años
const year = [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002];

let selectYears = document.getElementById("years");

let opcionVaciaYear = document.createElement("option");
opcionVaciaYear.innerText = "--Seleccionar--";
opcionVaciaYear.value = ' ';
selectYears.append(opcionVaciaYear);


// creo la etiqueta "P" para dar aviso de su seleccion
let avisoMarca = document.createElement("p");
let avisoanio = document.createElement("p");
let avisoPlan = document.createElement("p");
let resultadoCotizacion = document.createElement("p");

//recorro el array y creo options al select
year.forEach((year) => {




    let option = document.createElement("option");
    option.innerText = year;
    option.value = year;


    selectYears.append(option);
});


//accedo al boton guardar
let botonGuardar = document.getElementById("guardar");
//creo evento para guardar datos de usuario
botonGuardar.addEventListener("click", () => {

    Swal.fire({
        title: 'Desea guardar los Datos?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        denyButtonText: `No guardar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    })

    //llamo a la funcionque guarda datos

    guardarDatosDeUsuario();
    /*  agregarAlLucalStorage (usuarios); */



})



//Obtengo boton por id
boton = document.getElementById("boton-1");

//obtengo contendor donde se mostrara el resumen

let resumen = document.getElementById("divResumen");


//CREO EVENTO CLICK PARA EL BOTON COTIZAR

boton.addEventListener("click", () => {

    const valorMarca = selectMarcas.value;
    const valorYears = parseInt(selectYears.value);


    //accedo a los tipos de planes mediante ID
    let basico = document.getElementById("basico");
    let completo = document.getElementById("completo");
    let premium = document.getElementById("premium");

    let plan = ""
    //asigno plan a la variable vacia 

    if (basico.checked) {
        plan = "basico";
    } else if (completo.checked) {
        plan = "completo";
    } else if (premium.checked) {
        plan = "premium";
    }
    //valido que completen los campos requridos
    if (valorMarca === "" || valorYears === "" || plan === "") {
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'Complete los campos correctamente, por favor.',
            footer: 'Cotiza tu seguro al instante sin compromiso'
        })
    } else {
        //muestro el resultado final 

        avisoPlan.innerText = "Plan seleccionado: " + plan;

        divResumen.append(avisoPlan);

        let cotizacion = { plan, valorYears, valorMarca }


        let cotizacionFinal = (cotizar(cotizacion));

        avisoanio.innerText = "Año del motovehiculo: " + valorYears;

        divResumen.append(avisoanio);

        avisoMarca.innerText = "marca del motovehiculo: " + valorMarca;

        divResumen.append(avisoMarca);

        resultadoCotizacion.innerText = "Precio final: " + cotizacionFinal;
        divResumen.append(resultadoCotizacion);
    }

})


//creo la funcion cotizar que realizara toda la operación
const cotizar = (cotizacion) => {
    const { plan, valorYears, valorMarca } = cotizacion;
    //inicializo un precio base
    let precioBase = 1300;
    //multiplclio el precio base segun lo seleccionado por el usuario 
    const aumentoPorAnio = aumentoAnios(valorYears);
    precioBase = parseInt(precioBase * aumentoPorAnio);

    const aumentoPorMarca = aumentoMarca(valorMarca);
    precioBase = precioBase * aumentoPorMarca;

    const planObtenido = aumentoPlan(plan);

    precioBase = parseInt(planObtenido * precioBase);

    return precioBase;



}
//creo la funcion que agregara porcentaje segun el AÑO seleccionado
const aumentoAnios = (valorYears) => {



    let aumento;

    if (valorYears === 2022 || valorYears === 2021 || valorYears === 2020 || valorYears === 2019 || valorYears === 2018) {
        aumento = 1.50
    } else if (valorYears === 2017 || valorYears === 2016 || valorYears === 2015 || valorYears === 2014 || valorYears === 2013) {
        aumento = 1.20
    } else {
        aumento = 1.10
    }
    return aumento;
}

//creo la funcion que agregara el procentaje segun la MARCA seleccionada
const aumentoMarca = (valorMarca) => {

    let aumento

    if (valorMarca === "suzuki" || valorMarca === "ducati" || valorMarca === "yamaha" || valorMarca === "honda" || valorMarca === "benelli" || valorMarca === "ktm" || valorMarca === "rouser") {
        aumento = 1.50
    } else {
        aumento = 1.10
    }

    return aumento;
}

//creo la funcion que agregara el procentaje segun la PLAN seleccionada
const aumentoPlan = plan => {

    let aumento;

    if (plan === 'basico') {
        aumento = 1.10;
    } else if (plan === 'completo') {
        aumento = 1.20;
    } else {
        aumento = 1.35;
    }
    return aumento;
}


// CREO la funcion que va a guardar los datos ingresados por el susuario

function guardarDatosDeUsuario() {
    const nombreElement = document.getElementById("nombre");

    const apellidoElement = document.getElementById("apellido");

    const dniElement = document.getElementById("dni");



    const nombre = nombreElement.value;

    const apellido = apellidoElement.value;

    const dni = dniElement.value;



    usuarios.push({ nombre, apellido, dni });

    localStorage.setItem("datos", JSON.stringify(usuarios));

}














