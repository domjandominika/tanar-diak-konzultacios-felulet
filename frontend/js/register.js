document
  .getElementById("studentRegisterForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const result = document.getElementById("result");

    if (!name || !email || !password) {
      result.textContent = "Kérlek, tölts ki minden mezőt!";
      result.style.color = "red";
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
        result.style.color = "green";
        // Itt akár átirányítás is lehet:
        // window.location.href = 'login.html';
      } else {
        result.textContent = data.message;
        result.style.color = "red";
      }
    } catch (error) {
      console.error("Hálózati hiba:", error);
      result.textContent = "Hálózati hiba. Próbáld újra.";
      result.style.color = "red";
    }
  });

  function togglePassword() {
    const passwordInput = document.getElementById("password");
    const type = passwordInput.getAttribute("type");
    passwordInput.setAttribute("type", type === "password" ? "text" : "password");
  }
