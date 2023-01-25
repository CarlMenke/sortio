import { SET_AUTHENTICATION } from './actions'

const initialState = {
    isAuthenticated : false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_AUTHENTICATION :
            console.log(action.payload)
            return {
                ...state,
                isAuthenticated: action.payload
            }
        default: 
            return state
    }
}

export default reducer