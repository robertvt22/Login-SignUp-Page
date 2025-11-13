import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDfvcEOTvmneQVy-x5EgBnhyDfzPArU8eM",
    authDomain: "loginsignup-githubversion.firebaseapp.com",
    projectId: "loginsignup-githubversion",
    storageBucket: "loginsignup-githubversion.firebasestorage.app",
    messagingSenderId: "108737971005",
    appId: "1:108737971005:web:87431479d458f1a1b3bb54",
    measurementId: "G-GWLDXXFEN8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.querySelector(".main-form-login").addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Login form submitted");

    const userInput = document.querySelector("#user");
    const passwordInput = document.querySelector("#password");
    const errorMessageDiv = document.querySelector(".main-boxError-message");
    const loginValue = userInput ? userInput.value : "";
    const password = passwordInput ? passwordInput.value : "";

    if (!loginValue || !password) {
        errorMessageDiv.textContent = "Te rugăm să completezi toate câmpurile.";
        errorMessageDiv.style.display = "block";
        return;
    }

    try {
        let email = loginValue;

        // Verifică dacă loginValue este un email folosind o expresie regulată simplă
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(loginValue)) {
            // Dacă nu este email, presupunem că este username și căutăm în Firestore
            const usersQuery = query(collection(db, "users"), where("username", "==", loginValue));
            const querySnapshot = await getDocs(usersQuery);

            if (querySnapshot.empty) {
                errorMessageDiv.textContent = "Nu există utilizator cu acest username.";
                errorMessageDiv.style.display = "block";
                return;
            }

            // Obține email-ul din primul document găsit
            email = querySnapshot.docs[0].data().email;
        }

        // Autentificare cu email și parolă
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        errorMessageDiv.style.display = "none";
        alert("Logare reușită!"); // Înlocuiește cu notificare UI în viitor
        sessionStorage.setItem("userEmail", user.email);
        window.location.href = "welcome.html";
    } catch (error) {
        console.error("Eroare la logare:", error.code, error.message);
        let errorMessage;
        switch (error.code) {
            case "auth/wrong-password":
                errorMessage = "Parolă incorectă. Încearcă din nou.";
                break;
            case "auth/user-not-found":
                errorMessage = "Nu există utilizator cu acest email.";
                break;
            case "auth/invalid-email":
                errorMessage = "Format email invalid.";
                break;
            case "auth/invalid-credential":
                errorMessage = "Credențiale invalide. Verifică emailul/username-ul și parola.";
                break;
            default:
                errorMessage = "Eroare: " + error.message;
        }
        errorMessageDiv.textContent = errorMessage;
        errorMessageDiv.style.display = "block";
    }
});

const btnBoxLogin = document.querySelector(".btnBoxLogin");
const menuBurger = document.querySelector(".header-menuBurger");
const boxLogin = document.querySelector(".main-content");
const btnClose = document.querySelector(".main-buttonClose");

menuBurger.addEventListener("click", () => {
    menuBurger.classList.toggle("active");
    boxLogin.classList.toggle("active");
});

btnBoxLogin.addEventListener("click", () => {
    boxLogin.classList.add("active");
});

btnClose.addEventListener("click", () => {
    boxLogin.classList.remove("active");
    menuBurger.classList.remove("active");
});
