import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

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

async function loadUsers() {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersContainer = document.querySelector(".main-users");

        if (!usersContainer) {
            console.error("Elementul cu clasa 'main-users' nu a fost găsit.");
            return;
        }

        // Golește containerul înainte să adaugi utilizatorii noi
        usersContainer.innerHTML = "";

        if (querySnapshot.empty) {
            // Div pentru mesajul "Nu există utilizatori"
            const noUserDiv = document.createElement("div");
            noUserDiv.classList.add("main-user", "box");

            const noUserH2 = document.createElement("h2");
            noUserH2.classList.add("main-user-name");
            noUserH2.textContent = "Nu există utilizatori.";

            noUserDiv.appendChild(noUserH2);
            usersContainer.appendChild(noUserDiv);
            return;
        }

        // Creează un div pentru fiecare utilizator
        querySnapshot.forEach((doc) => {
            const username = doc.data().username || "Fără username";

            const userDiv = document.createElement("div");
            userDiv.classList.add("main-user", "box");

            const userH2 = document.createElement("h2");
            userH2.classList.add("main-user-name");
            userH2.textContent = username;

            userDiv.appendChild(userH2);
            usersContainer.appendChild(userDiv);
        });
    } catch (error) {
        console.error("Eroare la încărcarea listei de utilizatori:", error);
        const errorDiv = document.getElementById("error");
        if (errorDiv) {
            errorDiv.textContent = `Eroare la încărcare: ${error.message}`;
        }
    }
}

// Apelează funcția
loadUsers();

const btnBoxUser = document.querySelector(".btnBoxUser");
const menuBurger = document.querySelector(".header-menuBurger");
const boxUser = document.querySelector(".main-content");
const btnClose = document.querySelector(".main-buttonClose");

btnBoxUser.addEventListener("click", () => {
    boxUser.classList.add("active");
});

btnClose.addEventListener("click", () => {
    boxUser.classList.remove("active");
    menuBurger.classList.remove("active");
});

menuBurger.addEventListener("click", () => {
    menuBurger.classList.toggle("active");
    boxUser.classList.toggle("active");
});
