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

document.querySelector(".main-form-signup").addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Signup form submitted");

    const userInput = document.querySelector("#username");
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const errorMessageDiv = document.querySelector(".main-boxError-message");
    const email = emailInput ? emailInput.value : "";
    const password = passwordInput ? passwordInput.value : "";
    const username = userInput ? userInput.value : "";

    if (!email || !password || !username) {
        errorMessageDiv.textContent = "Vă rugăm să completați toate câmpurile, inclusiv username-ul";
        errorMessageDiv.style.display = "block";
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User created:", user.uid);

        // Actualizează displayName în Firebase Authentication

        // Salvează datele în Firestore
        await setDoc(doc(collection(db, "users"), user.uid), {
            email: email,
            username: username,
            createdAt: new Date(),
        });
        console.log("Data written to Firestore");

        errorMessageDiv.style.display = "none";
        alert("Înregistrare realizată cu succes!"); // Înlocuiește cu notificare UI
        window.location.href = "login.html";
    } catch (error) {
        console.error("Error during registration:", error.code, error.message);
        let errorMessage;
        switch (error.code) {
            case "auth/email-already-in-use":
                errorMessage = "Acest email este deja folosit.";
                break;
            case "auth/weak-password":
                errorMessage = "Parola este prea slabă. Folosește cel puțin 6 caractere.";
                break;
            case "auth/invalid-email":
                errorMessage = "Email-ul introdus nu este valid.";
                break;
            default:
                errorMessage = "A apărut o eroare: " + error.message;
        }
        errorMessageDiv.textContent = errorMessage;
        errorMessageDiv.style.display = "block";
    }
});

const btnBoxLogin = document.querySelector(".btnBoxLogin");
const menuBurger = document.querySelector(".header-menuBurger");
const boxSignUp = document.querySelector(".main-content");
const btnClose = document.querySelector(".main-buttonClose");

btnBoxLogin.addEventListener("click", () => {
    boxSignUp.classList.add("active");
});

menuBurger.addEventListener("click", () => {
    menuBurger.classList.toggle("active");
    boxSignUp.classList.toggle("active");
});

btnClose.addEventListener("click", () => {
    menuBurger.classList.remove("active");
    boxSignUp.classList.remove("active");
});
