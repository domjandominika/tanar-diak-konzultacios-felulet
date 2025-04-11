const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  console.log('Beírt email:', email);
  console.log('Beírt jelszó:', password);

  // Küldjük az adatokat a backendnek
  const response = await fetch('http://localhost:3000/api/students/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    // Ha sikeres a bejelentkezés
    localStorage.setItem('token', data.token);
    window.location.href = 'index.html';  // Átirányítás az index oldalra
  } else {
    // Ha hiba történik (pl. hibás jelszó vagy nem létező felhasználó)
    alert(data.message);
  }
});

  
function togglePassword() {
    const passwordInput = document.getElementById("password");
    const type = passwordInput.getAttribute("type");
    passwordInput.setAttribute("type", type === "password" ? "text" : "password");
}
