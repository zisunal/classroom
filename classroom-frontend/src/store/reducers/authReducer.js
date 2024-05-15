const initialState = {
    user: null,
    token: null,
    tokenExpires: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                tokenExpires: action.payload.tokenExpires,
            }
        case 'LOGOUT':
            return initialState
        default:
            return state
    }
}

export default authReducer