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

    // Közelgő időpontok hozzáadása
    const upcomingAppointments = [
        { date: '2025-04-12', time: '10:00', subject: 'Matematika konzultáció' },
        { date: '2025-04-15', time: '14:00', subject: 'Fizika konzultáció' },
        { date: '2025-04-18', time: '09:00', subject: 'Kémia konzultáció' }
    ];

    const appointmentsList = document.getElementById('appointmentsList');
    upcomingAppointments.forEach(appointment => {
        const li = document.createElement('li');
        li.textContent = `${appointment.date} ${appointment.time} - ${appointment.subject}`;
        appointmentsList.appendChild(li);
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