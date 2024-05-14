const initialState = {
    theme: 'light',
    appInfo: {}
};

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_THEME':
            return {
                ...state,
                theme: action.theme
            };
        case 'SET_APP_INFO':
            return {
                ...state,
                appInfo: action.appInfo
            };
        default:
            return state;
    }
}

export default settingsReducer;