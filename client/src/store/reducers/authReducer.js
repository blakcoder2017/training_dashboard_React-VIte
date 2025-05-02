import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, RESET_PASSWORD, SET_ERROR, CLEAR_ERROR, SET_LOADING, CLEAR_LOADING, SET_USER, CLEAR_USER, SET_AUTHENTICATED, CLEAR_AUTHENTICATED } from "../actions/authActions";


const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                loading: false,
                error: null,
            };
        case LOGOUT_USER:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                loading: false,
                error: null,
            };
        case REGISTER_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false,
                error: null,
            };
        case RESET_PASSWORD:
            return {
                ...state,
                loading: true,
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        case CLEAR_LOADING:
            return {
                ...state,
                loading: false,
            };
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case CLEAR_USER:
            return {
                ...state,
                user: null,
            };
        case SET_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: true,
            };
        case CLEAR_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: false,
            };
        default:
            return state;
    }
}

export default authReducer;