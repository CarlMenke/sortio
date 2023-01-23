import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDhNffkbanRBhpIVC_Zk2vxUtBEU8kPEcs",
    authDomain: "sortio-97d07.firebaseapp.com",
    projectId: "sortio-97d07",
    storageBucket: "sortio-97d07.appspot.com",
    messagingSenderId: "210991397926",
    appId: "1:210991397926:web:9e76e5c96f726e1f597ae7",
    measurementId: "G-MMVBX19GJB"
};


const firebase = initializeApp(firebaseConfig);
const auth = getAuth()
module.exports = { firebase, auth }

console.log("firebase before export:", firebase)