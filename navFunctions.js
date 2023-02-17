import { getBusinessDetails, getCurrentUsersBusinesses } from './firebaseFunctions'


const showInventory = async (navState, setNavStateAction, options) => {
    const response  = await getBusinessDetails(navState.business.businessName)
    const navStateSave = {
        ...navState,
        screen : "inventory",
        payload :  null, 
        options : typeof options === "object" ? options : {},
        business: response.data
    }
    await setNavStateAction(navStateSave)
}


const showMenuItems = async (navState, setNavStateAction, options) => {
    const response  = await getBusinessDetails(navState.business.businessName)
    const navStateSave = {
        ...navState,
        screen : "menuItems",
        payload :  null, 
        options : typeof options === "object" ? options : {},
        business: response.data
    }
    await setNavStateAction(navStateSave)
}

const showMenuItemForm = async (navState, setNavStateAction, options) => {
    const response  = await getBusinessDetails(navState.business.businessName)
    const navStateSave = {
        ...navState,
        screen : "menuItemForm",
        payload :  null, 
        options : typeof options === "object" ? options : {},
        business: response.data
    }
    await setNavStateAction(navStateSave)
}


const showMenuItemDetails = async (navState, setNavStateAction, options, data) => {
    console.log("inside showmenuitemdetails")
    const navStateSave = {
        ...navState,
        screen : 'menuItemDetail',
        payload :  data, 
        options: typeof options === "object" ? options : {},
    }
    if(options.refresh){
        const response = await getBusinessDetails(navState.business.businessName)
        navStateSave.business = response.data
    }
    await setNavStateAction(navStateSave)
}


const showInventoryItemDetails = async (navState, setNavStateAction, options, inventoryItemName) => {
    const navStateSave = {
        ...navState,
        screen : 'inventoryItemDetail',
        payload :  inventoryItemName, 
        options: typeof options === "object" ? options : {} 
    }
    if(options.refresh){
        const response = await getBusinessDetails(navState.business.businessName)
        navStateSave.business = response.data
    }
    await setNavStateAction(navStateSave)
}


const showBusinessSettings = async (navState, setNavStateAction, options) => {
    const response  = await getBusinessDetails(navState.business.businessName)
    const navStateSave = {
        ...navState,
        screen : 'businessSettings',
        payload :  null, 
        options : typeof options === "object" ? options : {},
        business: response.data
    }
    await setNavStateAction(navStateSave)
}


const showInventoryItemForm = async (navState, setNavStateAction, options) => {
    const navStateSave = {
        ...navState,
        screen : "inventoryItemForm",
        options : typeof options === "object" ? options : {}
    }
    await setNavStateAction(navStateSave)
}


const showHome = async (navState, setNavStateAction, options) => {
    const response  = await getCurrentUsersBusinesses()
    const navStateSave = {
        ...navState,
        screen: "home",
        payload: response.data,
        options : typeof options === "object" ? options : {},
        bottomBar : "home"
    }
    await setNavStateAction(navStateSave)
}


const showBusinessForm = async (navState, setNavStateAction, options) => {
    const navStateSave = {
        ...navState,
        screen: "businessForm",
        payload: null,
        options : typeof options === "object" ? options : {}
    }
    await setNavStateAction(navStateSave)
}


const showSettings = async (navState, setNavStateAction, options) => {
    const navStateSave = {
        ...navState,
        screen: "settings",
        payload: null,
        options : typeof options === "object" ? options : {}
    }
    await setNavStateAction(navStateSave)
}


const showBusiness = async (navState, setNavStateAction, options, query) => {
    const response  = await getBusinessDetails(query)
    const navStateSave = {
        ...navState,
        screen: 'business',
        payload:  null, 
        options : typeof options === "object" ? options : {},
        business: response.data,
        bottomBar: "business"
    }
    await setNavStateAction(navStateSave)
}

module.exports = {
    showInventory,
    showMenuItems,
    showBusinessSettings,
    showInventoryItemForm,
    showHome,
    showBusinessForm,
    showBusiness,
    showMenuItemForm,
    showMenuItemDetails,
    showInventoryItemDetails,
    showSettings
}
