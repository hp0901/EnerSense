/* eslint-disable no-undef */
/// <reference lib="webworker" />

importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyACcJDRyj5Qs2KQ6zRwEdA2QNlsJ2XVkFU",
  authDomain: "enersense-ada12.firebaseapp.com",
  projectId: "enersense-ada12",
  storageBucket: "enersense-ada12.appspot.com",
  messagingSenderId: "1048019583127",
  appId: "1:1048019583127:web:8b6b691dde220d529529d2"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

  console.log("Background message received:", payload);

  const title = payload?.notification?.title || "EnerSense Alert ⚡";
  const body = payload?.notification?.body || "Energy usage alert";

  self.registration.showNotification(title, {
    body: body,
    icon: "/logo192.png",
    badge: "/logo192.png",
    tag: "enersense-alert",
    renotify: true
  });

});