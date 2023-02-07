import { getBusinessDetails, getCurrentUsersBusinesses } from './firebaseFunctions'

const showInventory = async (navState, setNavStateAction, options) => {
    const response  = await getBusinessDetails(navState.payload.businessName)
    await setNavStateAction({
        screen : "inventory",
        payload : response.data,
        options : options
    })
}

const showMenuItems = async (navState, setNavStateAction, options) => {
    const response  = await getBusinessDetails(navState.payload.businessName)
    await setNavStateAction({
        screen : "menuItems",
        payload : response.data,
        options : options
    })
}

const showMenuItemForm = async (navState, setNavStateAction, options) => {
    const response  = await getBusinessDetails(navState.payload.businessName)
    await setNavStateAction({
        screen : "menuItemForm",
        payload : response.data,
        options : options
    })
}

const showMenuItemDetails = async (navState, setNavStateAction, options, data) => {
    await setNavStateAction({
        screen : 'menuItemDetail',
        payload : data,
        options: options
    })
}

const showInventoryItemDetails = async (navState, setNavStateAction, options, data) => {
    console.log(data)
    await setNavStateAction({
        screen : 'inventoryItemDetail',
        payload : data,
        options: options
    })
}

const showUpdateBusiness = async (navState, setNavStateAction, options) => {
    const response  = await getBusinessDetails(navState.payload.businessName)
    await setNavStateAction({
        screen : 'updateBusiness',
        payload : response.data,
        options : options
    })
}

const showInventoryItemForm = async (navState, setNavStateAction, options) => {
    await setNavStateAction({
        ...navState,
        screen : "inventoryItemForm",
        options : options
    })
}

const showHome = async (navState, setNavStateAction, options) => {
    const response  = await getCurrentUsersBusinesses()
    console.log("FIUBCOUBCOISCB", response)
    await setNavStateAction({
        screen: "home",
        payload: response.data,
        options : options
    })
}

const showBusinessForm = async (navState, setNavStateAction, options) => {
    await setNavStateAction({
        screen: "businessForm",
        payload: null,
        options : options
    })
}

const showSettings = async (navState, setNavStateAction, options) => {
    await setNavStateAction({
        screen: "settings",
        payload: null,
        options : options
    })
}


const showBusiness = async (navState, setNavStateAction, options, query) => {
    const response  = await getBusinessDetails(query)
    await setNavStateAction({
        screen: 'business',
        payload: response.data,
        options : options
    })
}

module.exports = {
    showInventory,
    showMenuItems,
    showUpdateBusiness,
    showInventoryItemForm,
    showHome,
    showBusinessForm,
    showBusiness,
    showMenuItemForm,
    showMenuItemDetails,
    showInventoryItemDetails,
    showSettings
}