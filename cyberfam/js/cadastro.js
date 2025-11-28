// IMPORTS DO FIREBASE (FUNCIONA EM <script type="module">)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// ==========================
// CONFIGURAÇÃO DO FIREBASE
// ==========================
const firebaseConfig = {
  apiKey: "AIzaSyCbbj_bUQASfdT_z4wJGwe4PTTJlicjzPk",
  authDomain: "cyberfam-eeaa1.firebaseapp.com",
  projectId: "cyberfam-eeaa1",
  storageBucket: "cyberfam-eeaa1.firebasestorage.app",
  messagingSenderId: "1065468330628",
  appId: "1:1065468330628:web:b784dc55f9049fd4f938d1"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ============================================
// LÓGICA DO CADASTRO
// ============================================
document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    const message = document.getElementById("message");

    // Validações básicas
    if (!name || !email || !password || !confirmPassword) {
        message.style.display = "block";
        message.style.color = "red";
        message.innerText = "Preencha todos os campos!";
        return;
    }

    if (password !== confirmPassword) {
        message.style.display = "block";
        message.style.color = "red";
        message.innerText = "As senhas não coincidem!";
        return;
    }

    if (password.length < 6) {
        message.style.display = "block";
        message.style.color = "red";
        message.innerText = "A senha deve ter pelo menos 6 caracteres.";
        return;
    }

    try {
        // Criar usuário no Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Salvar dados no Firestore
        await setDoc(doc(db, "usuarios", user.uid), {
            nome: name,
            email: email,
            criadoEm: new Date()
        });

        message.style.display = "block";
        message.style.color = "green";
        message.innerText = "Cadastro realizado com sucesso!";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);

    } catch (error) {
        message.style.display = "block";
        message.style.color = "red";
        message.innerText = "Erro: " + error.message;
    }
});
