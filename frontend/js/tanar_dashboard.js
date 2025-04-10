// Token lekérése
const token = localStorage.getItem("teacherToken");

// Ha nincs token, irány a login
if (!token) {
  window.location.href = "login.html?expired=true";
}

// Token ellenőrzés + felhasználói adatok betöltése
fetch("http://localhost:3001/api/teachers/profile", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((res) => {
    if (!res.ok) {
      throw new Error("Érvénytelen token.");
    }
    return res.json();
  })
  .then((data) => {
    document.getElementById("welcome").textContent = `Szia, ${data.name}!`;

    const profilePic = document.getElementById("profilePic");
    profilePic.src = data.profileImage
      ? data.profileImage + "?" + new Date().getTime()
      : "./css/img/default_avatar/woman.jpg?" + new Date().getTime();
  })
  .catch((err) => {
    console.error("Hiba:", err);
    window.location.href = "login.html?expired=true";
  });

// === Hamburger menü működés ===
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.add("open");
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("open");
});

// === Profilkép dropdown ===
const profilePic = document.getElementById("profilePic");
const dropdown = document.getElementById("profileDropdown");

profilePic.addEventListener("click", () => {
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", (e) => {
  if (!profilePic.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = "none";
  }
});

// === Kijelentkezés ===
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("teacherToken");
  localStorage.removeItem("teacherName");
  localStorage.removeItem("teacherEmail");
  window.location.href = "login.html";
});
