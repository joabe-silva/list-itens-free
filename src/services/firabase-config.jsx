import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCHFxLI6f0je7PegmTEB24VQYqBRhZ2D1U",
  authDomain: "list-itens-free.firebaseapp.com",
  databaseURL: "https://list-itens-free-default-rtdb.firebaseio.com",
  projectId: "list-itens-free",
  storageBucket: "list-itens-free.appspot.com",
  messagingSenderId: "962717576413",
  appId: "1:962717576413:web:b8ed75ddb1b200c8eeff34",
  measurementId: "G-WS4BBC024Q"
};

export const app = initializeApp(firebaseConfig);