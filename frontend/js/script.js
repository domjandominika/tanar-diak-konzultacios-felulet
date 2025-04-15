document.addEventListener('DOMContentLoaded', function () {
    // Ellenőrizzük, hogy van-e bejelentkezett felhasználó (JWT token)
    const token = localStorage.getItem('studentToken');
    const studentName = document.getElementById('studentName');
    const studentEmail = document.getElementById('studentEmail');

    // Ha nincs token, átirányítjuk a login oldalra
    if (!token) {
        window.location.href = 'login.html';
    } else {
        // Ha van token, betöltjük a felhasználó adatokat
        const studentNameValue = localStorage.getItem('studentName');

        // Ellenőrizzük, hogy a DOM elemek léteznek, mielőtt módosítanánk őket
        if (studentName) {
            studentName.textContent = studentNameValue;
        }
    }

    // Kijelentkezés funkció
    document.getElementById('logoutBtn')?.addEventListener('click', function () {
        localStorage.removeItem('studentToken');
        localStorage.removeItem('studentName');
        localStorage.removeItem('studentEmail');
        window.location.href = 'login.html'; // Kijelentkezés után vissza a bejelentkező oldalra
    });

    document.addEventListener('DOMContentLoaded', function () {
        const calendarEl = document.getElementById('calendar');
        if (calendarEl) {
          const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            height: 'auto',
          });
          calendar.render();
        }
      });
      
    // Naptár beállítása a FullCalendar használatával
    $('#calendar').fullCalendar({
        events: [
            {
                title: 'Matematika konzultáció',
                start: '2025-04-12T10:00:00',
            },
            {
                title: 'Fizika konzultáció',
                start: '2025-04-15T14:00:00',
            },
            {
                title: 'Kémia konzultáció',
                start: '2025-04-18T09:00:00',
            }
        ]
    });

    // Aktív fül kijelölése
    const currentPage = window.location.pathname.split('/').pop();
    const tabs = document.querySelectorAll('.sidebar a');
    tabs.forEach(tab => {
        if (tab.getAttribute('href') === currentPage) {
            tab.classList.add('active');
        }
    });
});
const profileImg = document.getElementById('profileImg');
const dropdownMenu = document.getElementById('dropdownMenu');
const logoutBtn = document.getElementById('logout');

// Ha rákattintasz a profilképre, megjelenik a menü
profileImg.addEventListener('click', () => {
  dropdownMenu.classList.toggle('show');
});

// Kijelentkezés
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('studentName');
  window.location.href = 'login.html'; // Visszairányítás a bejelentkezéshez
});

document.addEventListener("DOMContentLoaded", () => {
    function setupModal(triggerId, modalId) {
      const trigger = document.getElementById(triggerId);
      const modal = document.getElementById(modalId);
      const closeBtn = modal.querySelector(".close");
  
      trigger.addEventListener("click", () => {
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
      });
  
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = "";
      });
  
      window.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.display = "none";
          document.body.style.overflow = "";
        }
      });
    }
  });
  document.getElementById("open-booking").addEventListener("click", function () {
    const modal = document.getElementById("booking-modal");
    modal.style.display = "flex";
    modal.classList.add("modal-styles");
  });  
  
  // Bezárás
  document.querySelector('.close-modal')?.addEventListener('click', () => {
    document.getElementById('booking-modal').style.display = 'none';
  });
  
  // Beküldés kezelése (itt még csak kiírjuk)
  document.getElementById('booking-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const teacher = document.getElementById('teacher').value;
    const subject = document.getElementById('subject').value;
  
    alert(`Foglalás sikeres!\n${date} - ${time}\n${teacher} (${subject})`);
    document.getElementById('booking-modal').style.display = 'none';
  });
  
  
  