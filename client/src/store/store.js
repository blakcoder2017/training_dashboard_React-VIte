import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import chartReducer from './reducers/chartReducer';
// Combine your reducers
const rootReducer = combineReducers({
    auth: authReducer,
    chart: chartReducer,
});

// Configure the store
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            immutableCheck: false, // Disable immutable state checks
            serializableCheck: false, // Optional: disable serializable state checks
        }),
});

export default store;