// require("dotenv").config();

// const CLIENT_ID = process.env.MY_CLIENT_ID;
// const API_KEY = process.env.MY_API_KEY;
// const DISCOVERY_DOCS = [
//   "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
// ];
// const SCOPES = "https://www.googleapis.com/auth/calendar.events";

// /// Maneja el envío del formulario
// document
//   .getElementById("reservation-form")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();

//     // Captura los datos del formulario
//     const name = document.getElementById("name").value;
//     const lastname = document.getElementById("lastname").value;
//     const email = document.getElementById("email").value;
//     const cel = document.getElementById("cel").value;
//     const gender =
//       document.querySelector('input[name="Género"]:checked')?.value || "";
//     const service = document.getElementById("servicios").value;
//     const comment = document.getElementById("textarea").value;
//     const date = document.getElementById("date").value;
//     const time = document.getElementById("time").value;
//     const dateTime = new Date(`${date}T${time}`).toISOString();

//     createEvent(name, lastname, email, cel, gender, service, comment, dateTime);
//   });

// // Carga el cliente de Google
// function handleClientLoad() {
//   gapi.load("client:auth2", initClient);
// }

// function initClient() {
//   gapi.client
//     .init({
//       apiKey: API_KEY,
//       clientId: CLIENT_ID,
//       discoveryDocs: DISCOVERY_DOCS,
//       scope: SCOPES,
//     })
//     .then(() => {
//       // Autenticación del usuario
//       gapi.auth2.getAuthInstance().signIn();
//     })
//     .catch((error) => {
//       console.error("Error inicializando el cliente:", error);
//     });
// }

// // Crea un evento en Google Calendar
// function createEvent(name, email, dateTime) {
//   const start = new Date(dateTime);
//   const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hora de duración

//   const event = {
//     summary: `Reserva de ${name}`,
//     description: `Reserva hecha por ${name} (${email})`,
//     start: {
//       dateTime: start.toISOString(),
//       timeZone: "America/Argentina/Buenos_Aires",
//     },
//     end: {
//       dateTime: end.toISOString(),
//       timeZone: "America/Argentina/Buenos_Aires",
//     },
//     attendees: [{ email: email }],
//   };

//   // Inserta el evento en el calendario
//   gapi.client.calendar.events
//     .insert({
//       calendarId: "primary",
//       resource: event,
//     })
//     .then((response) => {
//       document.getElementById("response-message").textContent =
//         "Reserva creada con éxito.";
//       console.log("Evento creado:", response);
//     })
//     .catch((error) => {
//       document.getElementById("response-message").textContent =
//         "Error al crear la reserva.";
//       console.error("Error:", error);
//     });
// }
