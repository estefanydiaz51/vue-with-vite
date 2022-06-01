// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL6PALkt_QryOBY4H_VeDj8K8H7zv9Dvk",
  authDomain: "vue-3-2022-68619.firebaseapp.com",
  projectId: "vue-3-2022-68619",
  storageBucket: "vue-3-2022-68619.appspot.com",
  messagingSenderId: "816977218084",
  appId: "1:816977218084:web:86eb1036317b47eee2e6b1"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
export {
    auth
};