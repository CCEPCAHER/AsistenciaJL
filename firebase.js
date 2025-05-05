// firebase.js
// Inicializa Firebase y exporta los servicios que necesites

import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js';
import { getAnalytics }  from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js';
// Si vas a usar Firestore, Auth, Storage, etc., importa y exporta aquí también:
// import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

const firebaseConfig = {
  apiKey:            "AIzaSyDVyBQkm3I6hzAMfSFxO3it6GimB6b3GTk",
  authDomain:        "inventario-productos-b2b7a.firebaseapp.com",
  projectId:         "inventario-productos-b2b7a",
  storageBucket:     "inventario-productos-b2b7a.firebasestorage.app",
  messagingSenderId: "1080789959393",
  appId:             "1:1080789959393:web:8d3ca3d282514c791e6da0",
  measurementId:     "G-TEV1K6TBR5"
};

const app       = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Ejemplo si usaras Firestore:
// const db = getFirestore(app);

export { app, analytics /*, db */ };
