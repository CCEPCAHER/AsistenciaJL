// firebase.js
// Inicializa Firebase y exporta los servicios que necesites

import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import { getAnalytics }  from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js';
// Si luego necesitas Firestore, Auth, Storage, etc.:
// import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';
// import { getAuth }      from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
// import { getStorage }   from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js';

const firebaseConfig = {
  apiKey:            "AIzaSyDVyBQkm3I6hzAMfSFxO3it6GimB6b3GTk",
  authDomain:        "inventario-productos-b2b7a.firebaseapp.com",
  projectId:         "inventario-productos-b2b7a",
  storageBucket:     "inventario-productos-b2b7a.appspot.com",  // Revisa en tu consola
  messagingSenderId: "1080789959393",
  appId:             "1:1080789959393:web:8d3ca3d282514c791e6da0",
  measurementId:     "G-TEV1K6TBR5"
};

// Inicializa la app de Firebase
const app       = initializeApp(firebaseConfig);
// Inicializa Analytics (opcional)
const analytics = getAnalytics(app);

// Ejemplos de otros servicios (descomenta si los necesitas):
// const db      = getFirestore(app);
// const auth    = getAuth(app);
// const storage = getStorage(app);

export { app, analytics /*, db, auth, storage */ };
