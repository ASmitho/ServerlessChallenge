export default function logoutReducer(state={}, action) {
     switch(action.type){
        default:{
            return state
        }
        case "USER_LOGOUT":{
            return {state: undefined}
        }
    }
}