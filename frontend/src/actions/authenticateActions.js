export function authenticated() {
    return {
        type: "AUTHENTICATED",
        payload: true,
    }
}

export function notAuthenticated() {
    return {
        type: "NOT_AUTHENTICATED",
        payload: false,
    }
}

export function authenticating() {
    return {
        type: "AUTHENTICATING",
        payload: true,
    }
}

export function notAuthenticating() {
    return {
        type: "NOT_AUTHENTICATING",
        payload: false,
    }
}