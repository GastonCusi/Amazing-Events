let cartaPrincipal = document.getElementById("carta-dinamica");
console.log(cartaPrincipal);
let stringHTML = "";

for (events of data.events) {
  console.table(events);
  stringHTML += `<div class="card" style="width: 18rem;">
  <img src="${events.events}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${events.name}</h5>
    <p class="card-text">${events.description}</p>
    <h4>${"Price $ " + events.price}</h4>
    <a href="./details.html" class="btn btn-primary">Ver más</a>
  </div>
</div>`;
}
