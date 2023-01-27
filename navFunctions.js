import { getBusinessDetails, getCurrentUsersBusinesses } from './firebaseFunctions'

const showInventory = async (navState, setNavStateAction) => {
    const response  = await getBusinessDetails(navState.payload.businessName)
    await setNavStateAction({
        screen : "inventory",
        payload : response.data
    })
}

const showMenuItems = async (navState, setNavStateAction) => {
    const response  = await getBusinessDetails(navState.payload.businessName)
    await setNavStateAction({
        screen : "menuItems",
        payload : response.data
    })
}

const showUpdateBusiness = async (navState, setNavStateAction) => {
    const response  = await getBusinessDetails(navState.payload.businessName)
    await setNavStateAction({
        screen : 'updateBusiness',
        payload : response.data
    })
}

const showInventoryItemForm = async (navState, setNavStateAction) => {
    await setNavStateAction({
        ...navState,
        screen : "createInventoryItem"
    })
}

const showHome = async (navState, setNavStateAction) => {
    const response  = await getCurrentUsersBusinesses()
    await setNavStateAction({
        screen: "home",
        payload: response.data
    })
}

const showBusinessForm = async (navState, setNavStateAction) => {
    await setNavStateAction({
        screen: "businessForm",
        payload: null
    })
}

const showBusiness = async (navState, setNavStateAction, businessName) => {
    const response  = await getBusinessDetails(businessName)
    await setNavStateAction({
        screen: 'business',
        payload: response.data
    })
}

module.exports = {
    showInventory,
    showMenuItems,
    showUpdateBusiness,
    showInventoryItemForm,
    showHome,
    showBusinessForm,
    showBusiness
}