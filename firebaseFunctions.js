import { db, auth }   from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"

const handleError = (error) => {
    console.log(error)
}

const signup = async (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
        //you can set loading animation to start here
    }).catch((error) => {
        handleError(error)
    })
}

const login = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        //you can set loading animation to start here
    }).catch((error)=>{
        handleError(error)
    })
}


module.exports = {
    signup,
    login
}

