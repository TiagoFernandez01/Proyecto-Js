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

console.log(marcas);




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
const year = [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002]
let selectYears = document.getElementById("years");


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



let botonGuardar = document.getElementById("guardar");

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
    const valorYears = selectYears.value;

    avisoanio.innerText = "Año del motovehiculo: " + valorYears;

    divResumen.append(avisoanio);


    avisoMarca.innerText = "marca del motovehiculo: " + valorMarca;

    divResumen.append(avisoMarca);








    //accedo a los tipos de planes mediante ID
    let basico = document.getElementById("basico");
    let completo = document.getElementById("completo");
    let premium = document.getElementById("premium");

    let plan = ""
    //asigbno plan a la variable vacia 

    if (basico.checked) {
        plan = "basico";
    } else if (completo.checked) {
        plan = "completo";
    } else if (premium.checked) {
        plan = "premium";
    }
    //valido que completen los campos requridos
    if (valorMarca == "" || valorYears == "" || plan == "") {
        alert("Complete todos los campos");
    }



    avisoPlan.innerText = "Plan seleccionado: " + plan;

    divResumen.append(avisoPlan);

    let cotizacion = { plan, year }


    let cotizacionFinal = cotizar(cotizacion);


    resultadoCotizacion.innerText = "Precio final: " + cotizacionFinal;
    divResumen.append(resultadoCotizacion);

    console.log(cotizacionFinal);

    ///////////////////////////////////////////////////////////////////////////

})



const cotizar = (cotizacion) => {
    const { plan, year } = cotizacion;

    let precioBase = 2000;

    const aumentoPorAnio = aumentoAnios(year);
    
    precioBase = (precioBase * aumentoPorAnio);


    /* precioBase = calcularMarca(marca) * precioBase; */

    const planObtenido = aumentoPlan(plan);

    precioBase = parseFloat(planObtenido * precioBase).toFixed(2);

    return precioBase;



}

const aumentoAnios = (year) => {

  let aumento;

  switch(year){
      case 2018:
           aumento = 0.1;
            break;
      case 2019: 
      aumento = 0.1; 
      break;
      case 2020: 
      aumento = 0.1;
       break;
      case 2021 :
           aumento = 0.1;
       break;
      case 2022 :
           aumento = 0.1;
       break;
  }
  return aumento;



}


/* const calcularMarca = marca => {
    let porcentajeAniadido;

} */


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



    usuarios.push({nombre, apellido, dni});

    localStorage.setItem("datos", JSON.stringify(usuarios));

}














