export function fetchUser(user) {
    return {
        type: "FETCH_USER_FULFILLED",
        payload: {
            user_id: user.user_id,
            fullname: user.fullname,
            age: user.age,
            weight: user.weight, 
            height: user.height,
        }
    }
}

export function setUserId(userID) {
    return {
        type:"SET_USER_ID",
        payload: userID,
    }
}

export function setFullName(fullname) {
    return {
        type:"SET_FULLNAME",
        payload: fullname,
    }
}

export function setAge(age) {
    return {
        type:"SET_AGE",
        payload: age,
    }
}

export function setWeight(weight) {
    return {
        type:"SET_WEIGHT",
        payload: weight,
    }
}

export function setHeight(height) {
    return {
        type:"SET_HEIGHT",
        payload: height,
    }
}