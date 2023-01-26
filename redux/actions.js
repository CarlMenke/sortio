export const SET_AUTHENTICATION = "SET_AUTHENTICATION"
export const SET_NAVSTATE = "SET_NAVSTATE"

export const setAuthentication = (isAuthenticated) => dispatch => {
    dispatch({
        type : SET_AUTHENTICATION,
        payload : isAuthenticated
    })
}

export const setNavState = (navState) => dispatch => {
    dispatch({
        type : SET_NAVSTATE,
        payload : navState
    })
}
