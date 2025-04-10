document.addEventListener("DOMContentLoaded", () => {
  // Token lekérése
  const token = localStorage.getItem("teacherToken");

  // Ha nincs token, átirányítjuk a login oldalra
  if (!token) {
    window.location.href = "login.html?expired=true";
    return;
  }

  // Tokenes kérés a tanár profiljához
  fetch("http://localhost:3001/api/teachers/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Érvénytelen token vagy nem sikerült azonosítani.");
      }
      return res.json();
    })
    .then((data) => {
      // Köszöntés és profilkép megjelenítése
      document.getElementById("welcome").textContent = `Szia, ${data.name}!`;

      const profilePic = document.getElementById("profilePic");

      // Ha van profilkép URL a backendtől:
      if (data.profileImage) {
        profilePic.src = data.profileImage + "?" + new Date().getTime();
      } else {
        profilePic.src =
          "./css/img/default_avatar/woman.jpg?" + new Date().getTime(); // default, cache bypass
      }
    })
    .catch((err) => {
      console.error("Hiba:", err);
      window.location.href = "login.html?expired=true"; // Ha hiba van, irányítjuk a login oldalra
    });
     // FullCalendar inicializálása
  $('#calendar').fullCalendar({
    events: function(start, end, timezone, callback) {
      // Az időpontok lekérése a backendről
      fetch("http://localhost:3001/api/teachers/availability", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((response) => response.json())
      .then((data) => {
        // A backendről kapott események hozzáadása a FullCalendarhoz
        const events = data.map(item => ({
          title: item.student_name,  // a diák neve
          start: item.date + 'T' + item.time,  // dátum és idő
          color: item.status === 'booked' ? 'gray' : (item.status === 'unavailable' ? 'red' : 'lightgreen'),  // színezés státusz alapján
        }));

        callback(events);
      })
      .catch((error) => console.error('Hiba az események betöltésénél:', error));
    },
    editable: false,  // Az események nem módosíthatók
    droppable: false,  // Az események nem húzhatók
    events: []  // Kezdeti üres események
  });
});

// Profilkép kattintásra történő dropdown menü megjelenítés
const profilePic = document.getElementById("profilePic");
const dropdown = document.getElementById("profileDropdown");

profilePic.addEventListener("click", () => {
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
});

// Kattintás kívülre bezárja a menüt
document.addEventListener("click", (e) => {
  if (!profilePic.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = "none";
  }
});

// Kilépés gomb működése
document.getElementById("logoutBtn").addEventListener("click", () => {
  // Töröljük az összes mentett adatot
  localStorage.removeItem("teacherToken");
  localStorage.removeItem("teacherName");
  localStorage.removeItem("teacherEmail");

  // Átirányítás a login oldalra
  window.location.href = "login.html";
});
