import { db, auth }   from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { 
    doc, 
    setDoc, 
    getDoc
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
        await addBusinessToUser(businessName)
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
                await addBusinessToUser(businessName)
                return {
                    status: true,
                    message: "Joined Business"
                }
            }
        }
    }
}

const addBusinessToUser = async (businessName) => {
    const usersBusinessesRef = await getDoc(doc(db, "usersBusinesses", auth.currentUser.uid))
    if(usersBusinessesRef.exists()){
        const usersBusinessesData = usersBusinessesRef.data()
        usersBusinessesData.businesses.push(businessName)
        await setDoc(doc(db, 'usersBusinesses', auth.currentUser.uid), usersBusinessesData)
    }else{
        await setDoc(doc(db, 'usersBusinesses', auth.currentUser.uid),{businesses : [businessName] })
    }
}

const getCurrentUsersBusinesses = async () => {
    console.log("start of getCurrentUsersBusinesses")
    const usersBusinessesRef = await getDoc(doc(db, 'usersBusinesses', auth.currentUser.uid))
    console.log("inside getCurrentUseresBusinesses:", usersBusinessesRef.exists())
    if(usersBusinessesRef.exists()){
        const usersBusinessesData = usersBusinessesRef.data()
        return usersBusinessesData.businesses
    }else{
        return []
    }
}

const createIngredient = async (ingredientName, amountValue, amountUnit, usedInMenuItems) => {
    console.log(ingredientName, amountUnit,amountValue, usedInMenuItems )
    return "inside create Ingredients"
}
module.exports = {
    signup,
    login,
    createBusiness,
    joinBusiness,
    createIngredient,
    getCurrentUsersBusinesses
}

