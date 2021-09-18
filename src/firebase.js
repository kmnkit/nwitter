import * as firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD3GRwsM1yGqJ6khnseSOeX1LRNSEuTqlM",
    authDomain: "nwitter-marco.firebaseapp.com",
    projectId: "nwitter-marco",
    storageBucket: "nwitter-marco.appspot.com",
    messagingSenderId: "42448783356",
    appId: "1:42448783356:web:28f10401c5a69859509479"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);