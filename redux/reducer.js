import { 
    SET_AUTHENTICATION,
    SET_NAVSTATE
} from './actions'

const initialState = {
    isAuthenticated : false,
    navState : {
        screen : "home",
        payload : null,
        bottomBar : "startScreen"
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {

        case SET_AUTHENTICATION :
            return {
                ...state,
                isAuthenticated: action.payload
            }

        case SET_NAVSTATE : 
            return {
                ...state,
                navState : action.payload 
            }
            
        default: 
            return state
    }
}

export default reducer