let tarjetasDetalles = document.getElementById("contenedor");

let queryString = window.location.search;

let paramsQ = new URLSearchParams(queryString);

let idQ = paramsQ.get("_id");

fracEvents = data.events;

let tarjeta = data.events.find((fracEvents) => fracEvents._id == idQ);

tarjetasDetalles.innerHTML = `<div class="cajaDetalles">
        <img src="${tarjeta.image}" alt="">
        <div class="card-body">
            <h5 class="card-title">${tarjeta.name}</h5>
            <p class="card-text">${tarjeta.description}</p>
            <p class="card-text fw-bolder text-end text-danger">${
              tarjeta.date
            }</p>
            <p class="card-text fw-bold">${tarjeta.category}</p>
            <p>${tarjeta.place}</p>
            <p>${tarjeta.capacity}</p>
            <p>${tarjeta.assistance}</p>
            <p>${"Price $ " + tarjeta.price}</p>
        </div>
        </div>`;
contenedor.innerHTML = htmlString;
