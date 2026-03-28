import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyACcJDRyj5Qs2KQ6zRwEdA2QNlsJ2XVkFU",
  authDomain: "enersense-ada12.firebaseapp.com",
  projectId: "enersense-ada12",
  storageBucket: "enersense-ada12.firebasestorage.app",
  messagingSenderId: "1048019583127",
  appId: "1:1048019583127:web:8b6b691dde220d529529d2"
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app); 

