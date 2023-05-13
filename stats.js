const urlApi = "https://mindhub-xj03.onrender.com/api/amazing";
let tablePast = [],
  eventsUpcoming = [],
  tablePastEvents = [],
  tableUpcomingEvents = [];
let table1 = document.getElementById("table1");
let table2 = document.getElementById("table2");
let table3 = document.getElementById("table3");

//fetch
async function fetchData() {
  try {
    fetchData(urlApi)
      .then((Response) => Response.json())
      .then((data) => {
        let arrayEvents = data.events;
        pastEvents(arrayEvents, data);
        percentageAttendanceAndCapacity(eventsPast);
        tablePastEvents.forEach((category) => {
          revenues(eventsPast, category, "past");
        });
        tableUpcomingEvents.forEach((category) => {
          revenues(eventsUpcoming, category, "upcoming");
        });
      });
  } catch (error) {
    console.error("Error : " + error + ". Could not connect to the API");
  }
}

fetchData();

//funciones

function currentDate(object) {
  let currentDateString = object.currentDate;
  let currentDate = new Date(currentDateString);
  return currentDate;
}

function pastEvents(object, data) {
  for (event of object) {
    let eventDateString = event.date;
    let eventDate = new Date(eventDateString);
    eventDate < currentDate(data)
      ? eventsPast.push(event)
      : eventsUpcoming.push(event);
  }
}

function table_1(event) {
  table1.innerHTML = `
    <tr>
        <td> ${event.majorEventByAttendance}</td>
        <td> ${event.minorEventByAttendance}</td>
        <td> ${event.largestCapacityEvent}</td>
    </tr>`;
}

function table_2and3(table, category, revenues, sum) {
  let row = document.createElement("tr");
  row.innerHTML = `
        <td>${category}</td>
        <td>$${new Intl.NumberFormat("es-US").format(revenues)}</td>
        <td>${sum}</td>}`;
  table.appendChild(row);
}

function revenues(array, category, tiempo) {
  let revenues = 0,
    sum = 0,
    counter = 0;
  for (event of array) {
    if (event.category == category) {
      counter++;
      revenues +=
        (event.assistance ? event.assistance : event.estimate) * event.price;
      sum += parseFloat(
        (
          ((event.assistance ? event.assistance : event.estimate) * 100) /
          event.capacity
        ).toFixed(2)
      );
    }
  }

  sum = parseFloat(sum / counter).toFixed(2);

  if (tiempo == "past") {
    table_2and3(table3, category, revenues, sum);
  } else {
    table_2and3(table2, category, revenues, sum);
  }
}

function percentageAttendanceAndCapacity(array) {
  let majorEventByAttendance = "",
    minorEventByAttendance = "",
    largestEventByAttendance = "";
  let higherPercentage = 0;
  minorPercentage = 100;
  capacity = 0;

  for (event of array) {
    //eventos con el menor y mayor porcentaje de asistencia
    let auxPercentage = ((event.assistance * 100) / event.capacity).toFixed(2);
    if (auxPercentage > higherPercentage) {
      higherPercentage = auxPercentage;
      majorEventByAttendance = event.name;
    } else if (auxPercentage < minorPercentage) {
      minorPercentage = auxPercentage;
      minorEventByAttendance = event.name;
    }

    let auxCapacity = event.capacity;
    //eventos con la capacidad mas larga
    if (auxCapacity > capacity) {
      capacity = auxCapacity;
      largestCapacityEvent = event.name;
    }
  }

  table1.majorEventByAttendance = `${majorEventByAttendance} (${higherPercentage}%)`;
  table1.minorEventByAttendance = `${minorEventByAttendance} (${minorPercentage}%)`;
  table1.largestEventByAttendance = `${largestCapacityEvent} (${capacity})`;
  table_1(table1);
}
