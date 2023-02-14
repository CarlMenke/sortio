import { db, auth }   from './firebaseConfig';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword
} from "firebase/auth";

import { 
    doc, 
    setDoc, 
    getDoc,
    deleteDoc
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
            ownerEmail: auth.currentUser.email,
            users: [auth.currentUser.email],
            menuItems: {},
            inventoryItems: {}
        }
        await setDoc(doc(db, 'businesses', businessName), data)
        await addBusinessToUser(businessName, auth.currentUser.email)
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
                    businessData.users.push(auth.currentUser.email)
                    await setDoc(doc(db, 'businesses', businessName), businessData)
                    await addBusinessToUser(businessName, auth.currentUser.email)
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

const updateBusinessNameAndCode = async (businessName, businessCode, newBusinessData) => {
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
                if(businessData.ownerEmail !== auth.currentUser.email){
                    return{
                        status: false,
                        data: "Must Be Business Owner to Change"
                    }
                }else{
                    const updatedBusinessData = {...businessData, ...newBusinessData}
                    await deleteDoc(doc(db, "businesses", businessName ))
                    await setDoc(doc(db, 'businesses', updatedBusinessData.businessName), updatedBusinessData)

                    for(const email of updatedBusinessData.users){
                        await removeBusinessFromUser(businessName, email)
                        await addBusinessToUser(updatedBusinessData.businessName, email)
                    }

                    return {
                        status: true,
                        data:  updatedBusinessData.businessName
                    }
                }
            }
        }
    }catch(error){
        handleError("updateBusiness", error)
    }
}

const deleteBusiness = async (businessName, businessCode) => {
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
                if(businessData.ownerEmail !== auth.currentUser.email){
                    return{
                        status: false,
                        data: "Must Be Business Owner to Delete"
                    }
                }else{
                    await deleteDoc(doc(db, "businesses", businessName ))

                    for(const email of businessData.users){
                        await removeBusinessFromUser(businessName, email)
                    }
                    return {
                        status: true,
                        data:  "Deleted Business"
                    }
                }
            }
        }
    }catch(error){
        handleError("deleteBusiness", error)
    }
}

const makeUserBusinessOwner = async (businessName, businessCode,  newOwnerEmail) => {
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
                if(businessData.ownerEmail !== auth.currentUser.email){
                    return{
                        status: false,
                        data: "Must Be Business Owner to Change"
                    }
                }else{
                    businessData.ownerEmail = newOwnerEmail
                    await setDoc(doc(db, 'businesses', businessName), businessData, {merge:true})
                    return {
                        status: true,
                        data:  "new owner set"
                    }
                }
            }
        }
    }catch(error){
        handleError("makeUserBusinessOwner", error)
    }
}

const addBusinessToUser = async (businessName, email) => {
    try{
        console.log("inside addBusinessToUser", businessName, email)
        const usersBusinessesRef = await getDoc(doc(db, "usersBusinesses", email))
        if(usersBusinessesRef.exists()){
            const usersBusinessesData = usersBusinessesRef.data()
            usersBusinessesData.businesses.push(businessName)
            await setDoc(doc(db, 'usersBusinesses', email), usersBusinessesData)
        }else{
            await setDoc(doc(db, 'usersBusinesses',email),{businesses : [businessName] })
        }
    }catch(error){
        handleError("addBusinessToUser", error)
    }
}

const removeBusinessFromUser = async (businessName, email) => {
    try{
        console.log("insde removebusinessfromuser BusinessName:", businessName, email)
        const usersBusinessesRef = await getDoc(doc(db, "usersBusinesses", email))
        const businessRef = await getDoc(doc(db, "businesses", businessName))
        if(usersBusinessesRef.exists()){
            const usersBusinessesData = usersBusinessesRef.data()
            console.log(usersBusinessesData )
            for(let i = 0; i < usersBusinessesData.businesses.length; i++){
                if(usersBusinessesData.businesses[i] === businessName){
                    console.log("inside", usersBusinessesData.businesses[i])
                    usersBusinessesData.businesses.splice(i,1)
                    break
                }
            }
            await setDoc(doc(db, 'usersBusinesses', email), usersBusinessesData)
        }
        if(businessRef.exists()){
            const businessData = businessRef.data()
            const users = businessData.users
            for(let i = 0; i < users.length; i++){
                if(users[i] === email){
                    users.splice(i,1)
                    break
                }
            }
            await setDoc(doc(db, 'businesses', businessName), {users:users}, {merge:true})
        }
    }catch(error){
        handleError("removeBusinessFromUser", error)
    }
}

const getCurrentUsersBusinesses = async () => {
    try{
        const usersBusinessesRef = await getDoc(doc(db, 'usersBusinesses', auth.currentUser.email))
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

const createInventoryItem = async (inventoryItemName, amountValue, amountUnit, usedInMenuItems, businessName) => {
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
        handleError("createInventoryItem", error)
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
                const businessRef = await getDoc(doc(db, 'businesses', businessName))
                const inventoryItems = businessRef.data().inventoryItems

                for(const key in itemsUsed){
                    if(inventoryItems[key].usedIn.includes(name)) continue
                    inventoryItems[key].usedIn.push(name)
                }
                await setDoc(doc(db, "businesses", businessName), {inventoryItems:inventoryItems}, {merge:true})

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

const addInventoryItemsToMenuItem = async (itemsUsed, menuItem, businessName) => {
    try{
        const businessRef = await getDoc(doc(db, 'businesses', businessName))
        if(!businessRef.exists()){
            return {
                status: false,
                data: "Error Finding Business"
            }
        }else{
            const menuItems = businessRef.data().menuItems

            if(!menuItems[menuItem.name]){
                return{
                    status: false,
                    data: "Menu Item Doesnt Exist"
                }
            }else{
                menuItems[menuItem.name].itemsUsed = {...menuItems[menuItem.name].itemsUsed, ...itemsUsed}
                await setDoc(doc(db, "businesses", businessName), {menuItems:menuItems}, {merge:true})

                const businessRef = await getDoc(doc(db, 'businesses', businessName))
                const inventoryItems = businessRef.data().inventoryItems

                for(const key in itemsUsed){
                    if(inventoryItems[key].usedIn.includes(menuItem.name)) continue
                    inventoryItems[key].usedIn.push(menuItem.name)
                }
                await setDoc(doc(db, "businesses", businessName), {inventoryItems:inventoryItems}, {merge:true})

                return {
                    status: true,
                    data:"Added Items to Menu Item"
                }
            }
        }
    }catch(error){
        handleError("addInventoryItemsToMenuItem", error)
    }
}

const removeInventoryItemfromMenuItem = async (inventoryItemName, menuItemName, businessName) => {
    try{
        const businessRef = await getDoc(doc(db, 'businesses', businessName))
        if(!businessRef.exists()){
            return {
                status: false,
                data: "Error Finding Business"
            }
        }else{
            const menuItems = businessRef.data().menuItems
            if(!menuItems[menuItemName]){
                return{
                    status: false,
                    data: "Menu Item Doesnt Exist"
                }
            }else{
                delete menuItems[menuItemName].itemsUsed[inventoryItemName]
                await setDoc(doc(db, "businesses", businessName), {menuItems:menuItems}, {mergeFields: ['menuItems']})


                const businessRef = await getDoc(doc(db, 'businesses', businessName))
                const inventoryItems = businessRef.data().inventoryItems

                console.log(inventoryItems[inventoryItemName].usedIn)
                for(let i = 0; i < inventoryItems[inventoryItemName].usedIn.length; i++){
                    if(inventoryItems[inventoryItemName].usedIn[i] === menuItemName){
                        inventoryItems[inventoryItemName].usedIn.splice(i,1)
                        break
                    }
                }

                await setDoc(doc(db, "businesses", businessName), {inventoryItems:inventoryItems}, {merge:true})

                return {
                    status: true,
                    data:"Removed Item from Menu Item"
                }
            }
        }
    }catch(error){
        handleError("removeInventoryItemfromMenuItem", error)
    }
}

const deleteInventoryItem = async (inventoryItemName, businessName) => {
    try{
        const businessRef = await getDoc(doc(db, 'businesses', businessName))
        if(!businessRef.exists()){
            return {
                status: false,
                data: "Error Finding Business"
            }
        }else{
            const inventoryItems = businessRef.data().inventoryItems
            const menuItems = businessRef.data().menuItems
            if(!inventoryItems[inventoryItemName]){
                return{
                    status: false,
                    data: "Item Doesn't Exist"
                }
            }else{

                for(const menuItemName of inventoryItems[inventoryItemName].usedIn){
                    delete menuItems[menuItemName].itemsUsed[inventoryItemName]
                }
                delete inventoryItems[inventoryItemName]

                await setDoc(doc(db, 'businesses', businessName), {inventoryItems:inventoryItems}, {mergeFields: ['inventoryItems']})
                await setDoc(doc(db, 'businesses', businessName), {menuItems:menuItems}, {mergeFields: ['menuItems']})

                return{
                    status: true,
                    data: "Removed Item From Inventory"
                }
            }
        }
    }catch(error){
        handleError("deleteInventoryItem", error)
    }
}

const deleteMenuItem = async (menuItemName, businessName) => {
    try{
        const businessRef = await getDoc(doc(db, 'businesses', businessName))
        if(!businessRef.exists()){
            return {
                status: false,
                data: "Error Finding Business"
            }
        }else{
            const menuItems = businessRef.data().menuItems
            const inventoryItems = businessRef.data().inventoryItems

            if(!menuItems[menuItemName]){
                return{
                    status: false,
                    data: "Menu Item Doesn't Exist"
                }
            }else{                
                for(const key in menuItems[menuItemName].itemsUsed){
                    for(let i = 0; i < inventoryItems[key].usedIn.length; i++){
                        if(inventoryItems[key].usedIn[i] === menuItemName){
                            inventoryItems[key].usedIn.splice(i,1)
                            break
                        }
                    }
                }
                
                delete menuItems[menuItemName]
                await setDoc(doc(db, 'businesses', businessName), {menuItems:menuItems}, {merge:true})
                await setDoc(doc(db, 'businesses', businessName), {inventoryItems:inventoryItems}, {merge:true})


                return{
                    status: true,
                    data: "Removed Menu Item From Inventory"
                }
            }
        }
    }catch(error){
        handleError("deleteMenuItem", error)
    }
}

const updateInventoryItem = async (oldItemName, newItem, businessName) => {
    try{
        const businessRef = await getDoc(doc(db, 'businesses', businessName))
        if(!businessRef.exists()){
            return {
                status: false,
                data: "Error Finding Business"
            }
        }else{
            const inventoryItems = businessRef.data().inventoryItems
            if(!inventoryItems[oldItemName]){
                return{
                    status: false,
                    data: "Item Doesn't Exists"
                }
            }else{
                delete inventoryItems[oldItemName]
                inventoryItems[newItem.name] = newItem
                await setDoc(doc(db, 'businesses', businessName), {inventoryItems:inventoryItems}, {mergeFields: ['inventoryItems']})
                return{
                    status: true,
                    data: "Updated Item In Inventory"
                }
            }
        }
    }catch(error){
        handleError("updateInventoryItem", error)
    }
}

module.exports = {
    signup,
    login,
    createBusiness,
    joinBusiness,
    createInventoryItem,
    getCurrentUsersBusinesses,
    getBusinessDetails,
    createMenuItem,
    addInventoryItemsToMenuItem,
    updateBusinessNameAndCode,
    deleteBusiness,
    removeBusinessFromUser,
    makeUserBusinessOwner,
    deleteInventoryItem,
    deleteMenuItem,
    removeInventoryItemfromMenuItem,
    updateInventoryItem
}

