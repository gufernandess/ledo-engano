import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "noreply@ledo-engano.firebaseapp.com",
  projectId: "SEU_PROJETO_ID",
  storageBucket: "SEU_PROJETO.appspot.com",
  messagingSenderId: "...",
  appId: "...",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
