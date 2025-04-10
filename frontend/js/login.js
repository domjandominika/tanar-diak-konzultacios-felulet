function togglePassword() {
    const passwordInput = document.getElementById("password");
    const type = passwordInput.getAttribute("type");
    passwordInput.setAttribute("type", type === "password" ? "text" : "password");
}

// 1. Firebase konfiguráció
const firebaseConfig = {
    apiKey: "AIzaSyDQugkeqy-yOmHiixufHRsvPuAsvIa_tzg",
    authDomain: "sulis-projekt2.firebaseapp.com",
    projectId: "sulis-projekt2",
    storageBucket: "sulis-projekt2.appspot.com",
    messagingSenderId: "245402053703",
    appId: "1:245402053703:web:660dce3e6effbc85cc5562"
  };
  
  // 2. Firebase inicializálás
  firebase.initializeApp(firebaseConfig);
  
  // 3. Eseményfigyelők csak akkor, ha betöltődött a DOM
  document.addEventListener("DOMContentLoaded", () => {
    // Google login
    document.querySelector(".google").addEventListener("click", function (e) {
      e.preventDefault();
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then(result => {
          console.log("Sikeres bejelentkezés Google-lal:", result.user);
          alert("Bejelentkezve: " + result.user.email);
          // Példa: window.location.href = "profil.html";
        })
        .catch(error => {
          console.error("Hiba:", error);
          alert("Hiba történt a Google bejelentkezéskor.");
        });
    });
  
    // Facebook login
    document.querySelector(".facebook").addEventListener("click", function (e) {
      e.preventDefault();
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then(result => {
          console.log("Sikeres bejelentkezés Facebookkal:", result.user);
          alert("Bejelentkezve: " + result.user.email);
        })
        .catch(error => {
          console.error("Hiba:", error);
          alert("Hiba történt a Facebook bejelentkezéskor.");
        });
    });
  });
  