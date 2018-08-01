export default function userReducer(state={
    user_id: "",
    age: 0,
    fullname: "",
    weight: 0,
    height:0,
    }, action) {
     switch(action.type){
        default:{
            return state
        }
        case "SET_USER_ID": {
            return {...state, user_id: action.payload}
        }
        case "SET_AGE": {
            return {...state, age: action.payload}
        }
        case "SET_FULLNAME": {
            return {...state, fullname: action.payload} 
        }
        case "SET_WEIGHT": {
            return {...state, weight: action.payload} 
        }
        case "SET_HEIGHT": {
            return {...state, height: action.payload} 
        }
    }
}