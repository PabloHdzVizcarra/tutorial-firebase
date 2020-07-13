// Instala el paquete firebase con NPM
// npm i firebase
import firebase from 'firebase/app';
import 'firebase/firestore';


// configuracion de firebase obtenida desde la web
const firebaseConfig = {
  apiKey: "AIzaSyB-KTCN3DZWpnOyAWPCYTQyzPXsHs3GngY",
  authDomain: "sql-demos-a16ca.firebaseapp.com",
  databaseURL: "https://sql-demos-a16ca.firebaseio.com",
  projectId: "sql-demos-a16ca",
  storageBucket: "sql-demos-a16ca.appspot.com",
  messagingSenderId: "1060644181594",
  appId: "1:1060644181594:web:99d184d7d204c1d271aa63",
  measurementId: "G-QJ1FQ0MJZC"
};

// iniciamos la aplicacion firebase
firebase.initializeApp(firebaseConfig);

console.log('Firebase Configurado');

// se hace referencia a firestore mediante la constante
export const db = firebase.firestore();
