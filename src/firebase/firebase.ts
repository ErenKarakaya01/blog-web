import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const app = initializeApp({
  apiKey: "AIzaSyDvNGBX9KrqPpkRkvN3PtaRnC_a9keELyo",
  authDomain: "hakanblog-4af57.firebaseapp.com",
  projectId: "hakanblog-4af57",
  storageBucket: "hakanblog-4af57.appspot.com",
  messagingSenderId: "782223635122",
  appId: "1:782223635122:web:87af4b8e0ca40915cc8fab",
})

// Initialize Firebase
export const auth = getAuth(app)
export default app