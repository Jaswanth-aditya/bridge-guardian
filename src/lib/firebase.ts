import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBlegR1FUQ5sSD428ia1Juu04nMBkfJLBc",
  authDomain: "dtwins-project.firebaseapp.com",
  databaseURL: "https://dtwins-project-default-rtdb.firebaseio.com",
  projectId: "dtwins-project",
  storageBucket: "dtwins-project.firebasestorage.app",
  messagingSenderId: "391673187014",
  appId: "1:391673187014:web:26e76fdb0695c0eb6f25c7",
  measurementId: "G-N8CLM11EYH"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
