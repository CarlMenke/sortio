import { db, auth }   from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { 
    doc, 
    setDoc, 
    getDoc, 
    collection, 
    addDoc
} from "firebase/firestore"

const handleError = (error) => {
    console.log(error)
}

const signup = async (email, password, firstName, lastName) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
        result.user.updateProfile({
            displayName: `${firstName} ${lastName}`
        })
        //you can start loading animation to start here
    }).catch((error) => {
        handleError(error)
    })
}

const login = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        //you can start loading animation to start here
    }).catch((error)=>{
        handleError(error)
    })
}

const createBusiness = async (businessName, businessCode) => {
    const business = await getDoc(doc(db, "businesses", businessName))
    if(business.exists()){
        return {
            status: false,
            message: "Business Already Exists"
        }
    }else{
        const data = {
            businessName: businessName,
            businessCode: businessCode,
            ownerId: auth.currentUser.uid,
            users: [auth.currentUser.uid],
            menuItems: {},
            inventoryItems: {}
        }
        await setDoc(doc(db, 'businesses', businessName), data)
        return {
            status: true,
            message: "Business Created"
        }
    }

}

const joinBusiness = async (businessName, businessCode) => {
    const businessRef = await getDoc(doc(db, "businesses", businessName))
    if(!businessRef.exists()){
        return {
            status: false,
            message: "Business Doesnt Exists"
        }
    }else{
        const businessData = businessRef.data()
        if(businessData.businessCode !== businessCode){
            return {
                status: false,
                message: "Invalid Business Code"
            }
        }else{
            const usersSet = new Set(businessData.users)
            if(usersSet.has(auth.currentUser.uid)){
                return{
                    status: false,
                    message: "Already Joined Business"
                }
            }else{
                businessData.users.push(auth.currentUser.uid)
                await setDoc(doc(db, 'businesses', businessName), businessData)
                return {
                    status: true,
                    message: "Joined Business"
                }
            }
        }
    }
}

module.exports = {
    signup,
    login,
    createBusiness,
    joinBusiness
}

