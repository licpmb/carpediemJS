import CONFIG from "./config.js";

const CLIENT_ID = CONFIG.CLIENT_ID;
const API_KEY = CONFIG.API_KEY;
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];
const SCOPES =
  "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.app.created https://www.googleapis.com/auth/calendar.calendarlist.readonly https://www.googleapis.com/auth/calendar.events.freebusy https://www.googleapis.com/auth/calendar.freebusy https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.acls https://www.googleapis.com/auth/calendar.acls.readonly https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.calendarlist https://www.googleapis.com/auth/calendar.calendars https://www.googleapis.com/auth/calendar.calendars.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.owned https://www.googleapis.com/auth/calendar.events.owned.readonly https://www.googleapis.com/auth/calendar.events.readonly";

/// Maneja el envío del formulario
document
  .getElementById("reservation-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Captura los datos del formulario
    const name = document.getElementById("name").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const cel = document.getElementById("cel").value;
    const gender =
      document.querySelector('input[name="Género"]:checked')?.value || "";
    const service = document.getElementById("servicios").value;
    const comment = document.getElementById("textarea").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const dateTime = new Date(`${date}T${time}`).toISOString();

    createEvent(name, lastname, email, cel, gender, service, comment, dateTime);
  });

function initClient() {
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })
    .then(() => {
      // Autenticación del usuario
      console.log("init gapi client ok!");
      gapi.auth2.getAuthInstance().signIn();
    })
    .catch((error) => {
      console.error("Error inicializando el cliente:", error);
    });
}

// Carga el cliente de Google
function handleClientLoad() {
  if (typeof gapi !== "undefined") {
    console.log("gapi está disponible.");
    gapi.load("client:auth2", initClient);
  } else {
    console.error("gapi no está disponible.");
  }
}

// Crea un evento en Google Calendar
function createEvent(
  name,
  lastname,
  email,
  cel,
  gender,
  service,
  comment,
  dateTime
) {
  const start = new Date(dateTime);
  const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hora de duración

  const event = {
    summary: `Reserva de ${name}`,
    description: `Reserva hecha por ${name} ${lastname} (${email}), Cel: ${cel}, Género: ${gender}, Servicio: ${service}, Comentario: ${comment}`,
    start: {
      dateTime: start.toISOString(),
      timeZone: "America/Argentina/Buenos_Aires",
    },
    end: {
      dateTime: end.toISOString(),
      timeZone: "America/Argentina/Buenos_Aires",
    },
    attendees: [{ email: email }],
  };

  // Inserta el evento en el calendario
  gapi.client.calendar.events
    .insert({
      calendarId: "primary",
      resource: event,
    })
    .then((response) => {
      document.getElementById("response-message").textContent =
        "Reserva creada con éxito.";
      console.log("Evento creado:", response);
    })
    .catch((error) => {
      document.getElementById("response-message").textContent =
        "Error al crear la reserva: " + error.message;
      console.error("Error:", error);
    });
}
