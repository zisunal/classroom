import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './reducers/settingsReducer';
import authReducer from './reducers/authReducer';

const store = configureStore({
    reducer: {
        settings: settingsReducer,
        auth: authReducer,
    }
});

export default store;