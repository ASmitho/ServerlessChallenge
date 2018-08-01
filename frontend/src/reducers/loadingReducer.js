export default function loadingReducer(state={
    isLoading: false,
    gatheredData: false, 
    }, action) {
     switch(action.type){
        default:{
            return state
        }
        case "LOADING":{
            return {isLoading: true}
        }
        case "NOT_LOADING": {
            return {isLoading: false}
        }
        case "GATHERED": {
            return {gatheredData: true}
        }
    }
}