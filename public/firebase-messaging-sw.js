const CACHE_NAME = "version-1";
const urlsToCache = [];

const self = this;

//install a service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("openend cache");
      return cache.addAll(urlsToCache);
    })
  );
});

//listen for request
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

//activate the service worker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName))
            return caches.delete(cacheName);
        })
      );
    })
  );
});

importScripts("https://www.gstatic.com/firebasejs/7.15.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.15.1/firebase-messaging.js"
);

firebase.initializeApp({
    apiKey: "AIzaSyA0FuiiBzZLKGx2Gd6NaYFeBhmWv99MJdw",
    authDomain: "semester-buddy-6dcfc.firebaseapp.com",
    databaseURL: "https://semester-buddy-6dcfc.firebaseio.com",
    projectId: "semester-buddy-6dcfc",
    storageBucket: "semester-buddy-6dcfc.appspot.com",
    messagingSenderId: "911723924413",
    appId: "1:911723924413:web:615d9d3971c6a77331e0d4",
    measurementId: "G-B9RHF6XW2G"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  var obj = JSON.parse(payload.data.notification);
  var ntitle = obj.title;
  var noptions = {
    body: obj.body,
    icon: obj.icon,
  };
  return self.registration.showNotification(ntitle, noptions);
});
