document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    locale: "hu", // magyar nyelv
    height: 600,
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    events: function (fetchInfo, successCallback, failureCallback) {
      fetch(`http://localhost:3001/api/availability/${teacherId}`)
        .then((response) => response.json())
        .then((data) => {
          const events = data.map((item) => ({
            title: item.status === "booked" ? "Foglalt" : "Elérhető",
            start: `${item.date}T${item.time}`,
            color: item.status === "booked" ? "#b0bec5" : "#dcedc8", // Foglalt = szürke, elérhető = világos zöld
            textColor: "#333", // Szöveg színe
            borderColor: item.status === "booked" ? "#b0bec5" : "#dcedc8", // Border szín
          }));
          successCallback(events);
        })
        .catch((error) => {
          console.error("Hiba a naptár adatok lekérdezésekor:", error);
          failureCallback(error);
        });
    },
  });

  calendar.render();
});
