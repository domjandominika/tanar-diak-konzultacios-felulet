document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const result = document.getElementById("result");

    if (!email || !password) {
      result.textContent = "Kérlek, töltsd ki az összes mezőt!";
      result.className = "error";
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/teachers/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("teacherToken", data.token); // token tárolása
        localStorage.setItem("teacherName", data.name);
        localStorage.setItem("teacherEmail", data.email);
        result.textContent = data.message || "Sikeres bejelentkezés!";
        result.className = "success";

        // opcionálisan: átirányítás késleltetve
        setTimeout(() => {
          window.location.href = "dashboard.html"; // dashboard oldalra irányítás
        }, 1500);
      } else {
        result.textContent = data.message || "Hiba történt!";
        result.className = "error";
      }
    } catch (error) {
      console.error("Hiba:", error);
      result.textContent = "Hálózati hiba. Próbáld újra később.";
      result.className = "error";
    }
  });
