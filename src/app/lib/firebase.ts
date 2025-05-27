import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHlKxoYSR0BrAPwa9bj1vpnjMqj8SYy10",
  authDomain: "hrdashboard-aea61.firebaseapp.com",
  projectId: "hrdashboard-aea61",
  storageBucket: "hrdashboard-aea61.appspot.com",
  messagingSenderId: "926300542165",
  appId: "1:926300542165:web:66ddcdb2afbb3825c5fe5c",
  measurementId: "G-3LH6N5C84X"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 