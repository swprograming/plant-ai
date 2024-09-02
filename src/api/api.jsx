// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGSI3ZTJwyhKimxrB-cvQ4i_SpronvnYE",
  authDomain: "aiiii-7c077.firebaseapp.com",
  projectId: "aiiii-7c077",
  storageBucket: "aiiii-7c077.appspot.com",
  messagingSenderId: "847703586334",
  appId: "1:847703586334:web:b55646aee492e026a4a00f",
  measurementId: "G-FN216W1RWN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);