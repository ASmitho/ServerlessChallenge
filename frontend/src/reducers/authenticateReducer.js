export default function authenticateReducer(state={
    authenticated: false,
    authenticating: true,
    }, action) {
     switch(action.type){
        default:{
            return state
        }
        case "AUTHENTICATED":{
            return {...state, authenticated: true}
        }
        case "NOT_AUTHENTICATED": {
            return {...state, authenticated: false}
        }
        case "AUTHENTICATING":{
            return {...state, authenticating: true}
        }
        case "NOT_AUTHENTICATING": {
            return {...state, authenticating: false}
        }
    }
}

