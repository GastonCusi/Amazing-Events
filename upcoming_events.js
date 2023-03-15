const contenedor = document.getElementById("contenedor");
const contenedorCheck = document.getElementById("contenedorCheck");
const input = document.getElementById("search");

//llamadas a las funciones
input.addEventListener("input", filtroGeneral);
contenedorCheck.addEventListener("change", filtroGeneral);

imprimirTarjetas(data.events);
crearCheckbox(data.events);

//funcion filtro de filtros
function filtroGeneral() {
  let primerFiltro = filtroTexto(data.events, input.value);
  let segundoFiltro = filtrarPorFecha(primerFiltro);
  imprimirTarjetas(segundoFiltro);
}

//función para crear las checkboxes

function crearCheckbox(array) {
  let arrayDates = array.map((element) => element.category);
  let setDates = new Set(
    arrayDates.sort((a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    })
  );
  let checks = "";
  setDates.forEach((element) => {
    checks += `
        <div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="${element}" value="${element}">
  <label class="form-check-label" for="${element}">${element}</label>
</div>`;
  });
  contenedorCheck.innerHTML = checks;
}

//funcion de filtro por input
function filtroTexto(array, input) {
  let arrayFiltrado = array.filter((element) =>
    element.name.toLowerCase().includes(input.toLowerCase())
  );
  return arrayFiltrado;
}

//filtrado por fecha
function filtrarPorFecha(array) {
  let checkboxes = document.querySelectorAll("input[type='checkbox']");
  let arrayChecks = Array.from(checkboxes);
  let checksChequeados = arrayChecks.filter((check) => check.checked);
  if (checksChequeados.length == 0) {
    return array;
  }
  let fechas = checksChequeados.map((check) => check.value);
  let arrayFiltrado = array.filter((element) => fechas.includes(element.date));
  return arrayFiltrado;
}

//función para imprimir las tarjetas
function imprimirTarjetas(array) {
  if (array.length == 0) {
    contenedor.innerHTML =
      "<h2 class='display-1 fw-bolder'>Coincidences not found!</h2>";
    return;
  }
  let tarjetas = "";
  if (data.events.date >= data.currentDate) {
    array.forEach((element) => {
      tarjetas += `
        <div class="card text-bg-light mb-3" style="max-width: 18rem">
        <img src="${element.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${element.name}</h5>
            <p class="card-text">${element.description}</p>
            <p class="card-text fw-bolder text-end text-danger">${element.date}</p>
            <a href="./details.html" class="btn btn-primary">Details</a>
        </div>
        </div>`;
    });
    contenedor.innerHTML = tarjetas;
  }
}
