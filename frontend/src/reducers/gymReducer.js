export default function gymReducer(state={
    Gym: [],
    user_id: [],
    }, action) {
     switch(action.type){
        default:{
            return state
        }
        case "SET_GYM_USER": {
            return { 
                ...state,
                user_id: [...state.user_id, action.payload]}
        }
        case "SET_GYM": {
            return { 
                ...state,
                Gym: [...state.Gym, action.payload]}
        }
    }
}