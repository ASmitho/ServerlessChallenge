export function loading() {
    return {
        type: "LOADING",
        payload: true,
    }
}

export function notLoading() {
    return {
        type: "NOT_LOADING",
        payload: false,
    }
}

export function gatheredData() {
    return {
        type: "GATHERED",
        payload: true,
    }
}