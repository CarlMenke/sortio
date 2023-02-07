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

const handleError = (funcName, error) => {
    console.log(`Error from ${funcName}:`, error)
}

const signup = async (email, password, firstName, lastName) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
        result.user.updateProfile({
            displayName: `${firstName} ${lastName}`
        })
    }).catch((error) => {
        handleError('signUp', error)
    })
}

const login = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
        //you can start loading animation to start here
    }).catch((error)=>{
        handleError('login',error)
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
        handleError("createBusiness", error)
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
        handleError("joinBusiness", error)
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
        handleError("addBusinessToUser", error)
    }


}

const getCurrentUsersBusinesses = async () => {
    try{
        const usersBusinessesRef = await getDoc(doc(db, 'usersBusinesses', auth.currentUser.uid))
        if(usersBusinessesRef.exists()){
            const usersBusinessesData = usersBusinessesRef.data()
            return {
                status: true,
                data: usersBusinessesData.businesses ? usersBusinessesData.businesses : []
            }
        }else{
            return {
                status: false,
                data: []
            }
        }
    }catch(error){
        handleError("getCurrentUsersBusinesses", error)
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
        handleError("getBusinessDetails", error)
    }
}

const createIngredient = async (inventoryItemName, amountValue, amountUnit, usedInMenuItems, businessName) => {
    try{
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
        handleError("createIngredient", error)
    }

}

const createMenuItem = async (name, price, itemsUsed, businessName) => {
    try{
        const data = {
            name: name,
            price: price,
            itemsUsed: itemsUsed,
        }
        const businessRef = await getDoc(doc(db, 'businesses', businessName))
        if(!businessRef.exists()){
            return {
                status: false,
                data: "Error Finding Business"
            }
        }else{
            const menuItems = businessRef.data().menuItems
            if(menuItems[name]){
                return{
                    status: false,
                    data: "Menu Item Already Exists"
                }
            }else{
                menuItems[name] = data
                await setDoc(doc(db, "businesses", businessName), {menuItems:menuItems}, {merge:true})
                return {
                    status: true,
                    data:"added Item To Inventory"
                }
            }
        }
    }catch(error){
        handleError("createMenuItem", error)
    }
}   

const addInventoryItemsToMenuItemm = async (itemsUsed, menuItem, businessName) => {
    try{
        //items used must look like [
        //  {"amountUnit": "grams", "amountUsed": "10", "name": "TestItem2"}
        //  {"amountUnit": "grams", "amountUsed": "10", "name": "TestItem2"}
        //  ]
        const businessRef = await getDoc(doc(db, 'businesses', businessName))
        if(!businessRef.exists()){
            return {
                status: false,
                data: "Error Finding Business"
            }
        }else{
            const menuItems = businessRef.data().menuItems[menuItem]
            if(!menuItems[menuItem.name]){
                return{
                    status: false,
                    data: "Menu Item Doesnt Exist"
                }
            }else{
                menuItems[menuItem.name].itemsUsed.push(...itemsUsed)
                await setDoc(doc(db, "businesses", businessName), {menuItems:menuItems}, {merge:true})
                return {
                    status: true,
                    data:"Added Items to Menu Item"
                }
            }
        }
    }catch(error){
        handleError("createMenuItem", error)
    }
}
module.exports = {
    signup,
    login,
    createBusiness,
    joinBusiness,
    createIngredient,
    getCurrentUsersBusinesses,
    getBusinessDetails,
    createMenuItem,
    addInventoryItemsToMenuItemm
}

