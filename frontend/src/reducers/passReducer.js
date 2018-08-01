export default function passReducer(state={
    password: "",
    }, action) {
     switch(action.type){
        default:{
            return state
        }
        case "PASSWORD":{
            return {...state, password: action.payload}
        }
    }
}