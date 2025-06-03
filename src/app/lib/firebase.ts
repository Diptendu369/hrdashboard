// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAHlKxoYSR0BrAPwa9bj1vpnjMqj8SYy10",
//   authDomain: "hrdashboard-aea61.firebaseapp.com",
//   projectId: "hrdashboard-aea61",
//   storageBucket: "hrdashboard-aea61.appspot.com",
//   messagingSenderId: "926300542165",
//   appId: "1:926300542165:web:66ddcdb2afbb3825c5fe5c",
//   measurementId: "G-3LH6N5C84X"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app); 

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
