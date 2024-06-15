const INITIAL_STATE = {
    token: localStorage.getItem("token") || null
}

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TOKEN":
            localStorage.setItem("token", action.payload)
            return { ...state, token: action.payload }
        case "REMOVE_TOKEN":
            localStorage.setItem("token", "")
            setTimeout(() => {
                return { ...state, token: null }
            }, 3000)
            break;
        default:
            return state
    }
}

export { INITIAL_STATE, reducer }