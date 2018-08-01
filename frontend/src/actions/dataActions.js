export function addBench(weight) {
    return {
        type: "ADD_BENCH",
        payload: weight,
    }
}

export function addSquat(weight) {
    return {
        type: "ADD_SQUAT",
        payload: weight,
    }
}

export function addDeadlift(weight) {
    return {
        type: "ADD_DEADLIFT",
        payload: weight,
    }
}

export function addOverhead(weight) {
    return {
        type: "ADD_OVERHEAD",
        payload: weight,
    }
}

export function addRow(weight) {
    return {
        type: "ADD_ROW",
        payload: weight,
    }
}

export function setBench(weight) {
    return {
        type: "SET_BENCH",
        payload: weight,
    }
}

export function setSquat(weight) {
    return {
        type: "SET_SQUAT",
        payload: weight,
    }
}

export function setDeadlift(weight) {
    return {
        type: "SET_DEADLIFT",
        payload: weight,
    }
}

export function setOverhead(weight) {
    return {
        type: "SET_OVERHEAD",
        payload: weight,
    }
}

export function setRow(weight) {
    return {
        type: "SET_ROW",
        payload: weight,
    }
}