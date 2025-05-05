// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6Vv0gIWBPIyOzPKmIpGHvvH4DtajkQYQ", // Replaced placeholder
  authDomain: "tuannguyenhoang-ea4d1.firebaseapp.com", // Replaced placeholder
  projectId: "tuannguyenhoang-ea4d1",
  storageBucket: "tuannguyenhoang-ea4d1.appspot.com", // Replaced placeholder
  messagingSenderId: "571492812629", // Replaced placeholder
  appId: "1:571492812629:web:c57b9d1f9c7fdf9015e1e7", // Replaced placeholder
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
