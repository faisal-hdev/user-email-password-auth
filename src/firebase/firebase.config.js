// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIdJ6QeH2lBPacD61EJ5L0GCcI0Pcyn1M",
  authDomain: "user-email-password-auth-1de80.firebaseapp.com",
  projectId: "user-email-password-auth-1de80",
  storageBucket: "user-email-password-auth-1de80.appspot.com",
  messagingSenderId: "248849952305",
  appId: "1:248849952305:web:99a80809e33e8359ae6f10",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
