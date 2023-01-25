export const SET_AUTHENTICATION = "SET_AUTHENTICATION"

export const setAuthentication = (isAuthenticated) => dispatch => {
    dispatch({
        type : SET_AUTHENTICATION,
        payload : isAuthenticated
    })
}
