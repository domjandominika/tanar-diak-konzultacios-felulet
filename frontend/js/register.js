document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const result = document.getElementById("result");

  if (!name || !email || !password) {
    result.textContent = "Kérlek, töltsd ki az összes mezőt!";
    result.className = "error";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/students/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      result.textContent = data.message;
      result.className = "success";
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    } else {
      result.textContent = data.message || "Hiba történt a regisztráció során.";
      result.className = "error";
    }
  } catch (err) {
    result.textContent = "Hálózati hiba. Próbáld újra.";
    result.className = "error";
  }
});

  function togglePassword() {
    const passwordInput = document.getElementById("password");
    const type = passwordInput.getAttribute("type");
    passwordInput.setAttribute("type", type === "password" ? "text" : "password");
  }
