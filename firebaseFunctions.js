import { db, auth }   from './firebaseConfig';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword
} from "firebase/auth";

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
    try{
    const business = await getDoc(doc(db, "businesses", businessName))
    if(business.exists()){
        return {
            status: false,
            data: "Business Already Exists"
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
            data: "Business Created"
        }
    }
    }catch(error){
        console.log("Error from createBusiness:", error)
    }
}

const joinBusiness = async (businessName, businessCode) => {
    try{
        const businessRef = await getDoc(doc(db, "businesses", businessName))
        if(!businessRef.exists()){
            return {
                status: false,
                data: "Business Doesnt Exists"
            }
        }else{
            const businessData = businessRef.data()
            if(businessData.businessCode !== businessCode){
                return {
                    status: false,
                    data: "Invalid Business Code"
                }
            }else{
                const usersSet = new Set(businessData.users)
                if(usersSet.has(auth.currentUser.uid)){
                    return{
                        status: false,
                        data: "Already Joined Business"
                    }
                }else{
                    businessData.users.push(auth.currentUser.uid)
                    await setDoc(doc(db, 'businesses', businessName), businessData)
                    await addBusinessToUser(businessName)
                    return {
                        status: true,
                        data: "Joined Business"
                    }
                }
            }
        }
    }catch(error){
        console.log("Error from joinBusiness:", error)
    }
}

const addBusinessToUser = async (businessName) => {
    try{
        const usersBusinessesRef = await getDoc(doc(db, "usersBusinesses", auth.currentUser.uid))
        if(usersBusinessesRef.exists()){
            const usersBusinessesData = usersBusinessesRef.data()
            usersBusinessesData.businesses.push(businessName)
            await setDoc(doc(db, 'usersBusinesses', auth.currentUser.uid), usersBusinessesData)
        }else{
            await setDoc(doc(db, 'usersBusinesses', auth.currentUser.uid),{businesses : [businessName] })
        }
    }catch(error){
        console.log("Error from addBusinessToUser:", error)
    }


}

const getCurrentUsersBusinesses = async () => {
    try{
        const usersBusinessesRef = await getDoc(doc(db, 'usersBusinesses', auth.currentUser.uid))
        if(usersBusinessesRef.exists()){
            const usersBusinessesData = usersBusinessesRef.data()
            return {
                status: true,
                data: usersBusinessesData.businesses
            }
        }else{
            return {
                status: false,
                data: []
            }
        }
    }catch(error){
        console.log("Error from getCurrentUsersBusinesses:", error)
    }
}

const getBusinessDetails = async (businessName) => {
    try{
        const businessRef = await getDoc(doc(db, 'businesses', businessName ))
        if(businessRef.exists()){
            const businessData = businessRef.data()
            return {
                status: true,
                data: businessData
            }
        }else{
            return {
                status: false,
                data: "Could not retrieve business data"
            }
        }
    }catch(error){
        console.log("Error from getBusinessDetails:", error)
    }
}

const createIngredient = async (inventoryItemName, amountValue, amountUnit, usedInMenuItems, businessName) => {
    try{
        console.log(businessName)
        const data = {
            name: inventoryItemName,
            currentUnit: amountUnit,
            currentValue: amountValue,
            usedIn: usedInMenuItems
        }
        const businessRef = await getDoc(doc(db, 'businesses', businessName))
        if(!businessRef.exists()){
            return {
                status: false,
                data: "Error Finding Business"
            }
        }else{
            const inventoryItems = businessRef.data().inventoryItems
            if(inventoryItems[inventoryItemName]){
                return{
                    status: false,
                    data: "Item Already Exists"
                }
            }else{
                inventoryItems[inventoryItemName] = data
                await setDoc(doc(db, 'businesses', businessName), {inventoryItems:inventoryItems}, {merge:true})
                return{
                    status: true,
                    data: "Added Item To Inventory"
                }
            }
        }
    }catch(error){
        console.log("Error from createIngredient:", error)
    }

}
module.exports = {
    signup,
    login,
    createBusiness,
    joinBusiness,
    createIngredient,
    getCurrentUsersBusinesses,
    getBusinessDetails
}

