let params = new URLSearchParams(location.search);

let id = params.get("id");

let tarjeta = data.events.find((info) => info._id == id);

let contenedor = document.getElementById("contenedor-detalles");

let htmlString = "";

htmlString += `
    <div class="card-detail card-img-left">
      <div class="img-card-left">
        <img src="${tarjeta.image}" alt="${tarjeta.name}" width="100%">
      </div>
        
      <div class="card-body_Details">
          <h5 class="card-title">${tarjeta.name}</h5>
          <p class="card-text-center" class="card-text">${tarjeta.description}</p>
          <p class="card-text fw-bolder text-end text-danger">Date: ${tarjeta.date}</p>
          <p class="card-text fw-bold">Category: ${tarjeta.category}</p>
          <p>Place: ${tarjeta.place}</p>
          <p>Capacity: ${tarjeta.capacity}</p>
          <p>Assistance estimate: ${tarjeta.assistance}</p>
          <p>$Price: $${tarjeta.price}</p>
      </div>
    </div>`;
contenedor.innerHTML = htmlString;
