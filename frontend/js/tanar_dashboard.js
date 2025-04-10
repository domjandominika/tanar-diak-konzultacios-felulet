// Token lekérése localStorage-ból
const token = localStorage.getItem("teacherToken");

// Ha nincs token, azonnali átirányítás
if (!token) {
  window.location.href = "login.html?expired=true";
}

// Tokenes kérés a tanár profilhoz
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
    document.getElementById("welcome").textContent = `Szia, ${data.name}!`;

    const profilePic = document.getElementById("profilePic");

    // Ha van profilkép URL a backendtől:
    if (data.profileImage) {
      profilePic.src = data.profileImage + "?" + new Date().getTime();
    } else {
      profilePic.src = "./css/img/default_avatar/woman.jpg?" + new Date().getTime(); // default, cache bypass
    }
  })

  .catch((err) => {
    console.error("Hiba:", err);
    // Átirányítás login oldalra figyelmeztetéssel
    window.location.href = "login.html?expired=true";
  });

// Kilépés gomb működése
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("teacherToken");
  localStorage.removeItem("teacherName");
  localStorage.removeItem("teacherEmail");
  window.location.href = "login.html";
});

//Tanár profilkép kattinthatósága
document.getElementById("profilePic").addEventListener("click", () => {
  document.getElementById("profileModal").style.display = "block";
});
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("profileModal").style.display = "none";
});
