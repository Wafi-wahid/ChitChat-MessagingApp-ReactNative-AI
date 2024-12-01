// firebase/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA8_G1rkLvZFPZiLMjDNrxRloxAp0n1m1c",
  authDomain: "mad-proj-81ad8.firebaseapp.com",
  projectId: "mad-proj-81ad8",
  storageBucket: "mad-proj-81ad8.appspot.com",
  messagingSenderId: "822483332487",
  appId: "1:822483332487:web:2f64f810329b917f2db722",
  measurementId: "G-N9T766GD9M",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
