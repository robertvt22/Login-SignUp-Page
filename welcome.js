import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

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

onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const username = userDoc.data().username || "User";
                document.querySelector(".main-message-welcome-user").textContent = `${username}`;
            } else {
                console.error("Documentul utilizatorului nu există în Firestore.");
                document.querySelector(".main-message-welcome-user").textContent = `@User!`;
            }
        } catch (error) {
            console.error("Eroare la obținerea username-ului:", error);
            document.querySelector(".main-message-welcome-user").textContent = `@User!`;
        }
    } else {
        window.location.href = "login.html";
    }
});

const btnBoxWelcome = document.querySelector(".btnBoxWelcome");
const menuBurger = document.querySelector(".header-menuBurger");
const boxWelcome = document.querySelector(".main-content");
const btnClose = document.querySelector(".main-buttonClose");

btnBoxWelcome.addEventListener("click", () => {
    boxWelcome.classList.add("active");
});

menuBurger.addEventListener("click", () => {
    menuBurger.classList.toggle("active");
    boxWelcome.classList.toggle("active");
});

btnClose.addEventListener("click", () => {
    boxWelcome.classList.remove("active");
    menuBurger.classList.remove("active");
});
