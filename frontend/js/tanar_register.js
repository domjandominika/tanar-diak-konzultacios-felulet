const form = document.getElementById("registerForm");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const privacyChecked = document.getElementById("privacy").checked;

  if (!name || !email || !password || !privacyChecked) {
    result.textContent =
      "Kérlek, tölts ki minden mezőt és fogadd el az adatvédelmet!";
    result.className = "error";
    return;
  }

  fetch("http://localhost:3001/api/teachers/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.teacherId) {
        result.textContent = `✅ Sikeres regisztráció! Azonosítód: ${data.teacherId}`;
        result.className = "success";
        form.reset();
      } else {
        result.textContent = data.message || "Ismeretlen hiba történt.";
        result.className = "error";
      }
    })
    .catch((err) => {
      result.textContent = "❌ Nem sikerült kapcsolódni a szerverhez.";
      result.className = "error";
      console.error(err);
    });
});
