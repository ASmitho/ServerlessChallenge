
export function setUserId(userID) {
    return {
        type:"SET_GYM_USER",
        payload: userID,
    }
}

export function setGym(Gym) {
    return {
        type:"SET_GYM",
        payload: Gym,
    }
}