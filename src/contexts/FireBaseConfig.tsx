//import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDIEt56EEZNqsaZr9qJGDHWczavq5AYxaI",
  authDomain: "cursoapp-b11dd.firebaseapp.com",
  projectId: "cursoapp-b11dd",
  storageBucket: "cursoapp-b11dd.appspot.com",
  messagingSenderId: "545094377699",
  appId: "1:545094377699:web:5a94945200d2debce6e5d6",
  measurementId: "G-J24MCVE8D2"
};

//gs://cursoapp-b11dd

//gs://cursoapp-b11dd.appspot.com

const fb = initializeApp(firebaseConfig);
const analytics = getAnalytics(fb);

export default fb;
