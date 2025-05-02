import { auth } from '../../firebase/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, updateProfile } from 'firebase/auth';
import { firebaseErrorMessages } from '../../hooks/errorMessages';


export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const REGISTER_USER = "REGISTER_USER";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const SET_LOADING = "SET_LOADING";
export const CLEAR_LOADING = "CLEAR_LOADING";
export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const CLEAR_AUTHENTICATED = "CLEAR_AUTHENTICATED";


export const setLoading = () => ({
    type: SET_LOADING,
  });
  
export const clearLoading = () => ({
    type: CLEAR_LOADING,
  });

export const setError = (error) => ({
    type: SET_ERROR,
    payload: firebaseErrorMessages[error] || firebaseErrorMessages.default,  
  });
  
export const clearError = () => ({
    type: CLEAR_ERROR,
  });
  
export const setAuthenticated = () => ({
    type: SET_AUTHENTICATED,
  });
  
export const clearAuthenticated = () => ({
    type: CLEAR_AUTHENTICATED,
  });
  
export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
  });
  
  export const clearUser = () => ({
    type: CLEAR_USER,
  });
  
  //Login Action
  export const loginUser = (email, password) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        
        dispatch({ type: LOGIN_USER, payload: userData });
        dispatch(setUser(userData));
        dispatch(clearLoading());
        dispatch(setAuthenticated());
        
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = firebaseErrorMessages[errorCode] || firebaseErrorMessages.default;
        dispatch(setError(errorMessage));
        dispatch(clearLoading());
    }finally {
        dispatch(clearLoading());
    }
  }
  
  //Reset Password Action
  export const resetPassword = (email) => async (dispatch) => {
    dispatch(setLoading());
    try {
        await sendPasswordResetEmail(auth, email);
        dispatch(clearLoading());
    } catch (error) {
        dispatch(setError(error.code));
        dispatch(clearLoading());
    }finally {
        dispatch(clearLoading());
    }
  }
  
  export const registerUser = (email, password, displayName) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await updateProfile(user, {
          displayName: displayName,
        });
        
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        dispatch(loginUser({ type: REGISTER_USER, payload:userData,}));
        dispatch(setUser(userData));
        dispatch(clearLoading());
        dispatch(setAuthenticated());
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = firebaseErrorMessages[errorCode] || firebaseErrorMessages.default;
        dispatch(setError(errorMessage));
        dispatch(clearLoading());
    }finally {
        dispatch(clearLoading());
    }
  }
  //Logout Action
  export const logoutUser = () => async (dispatch) => {
    dispatch(setLoading());
    try {
      // Sign out the user from Firebase Authentication
      await signOut(auth);
      
      auth.onAuthStateChanged(user => {
        if (!user) {
          dispatch(clearUser());
          dispatch(clearAuthenticated());
        }
      });
      
      // Additional cleanup (if necessary)
      dispatch(clearLoading());
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = firebaseErrorMessages[errorCode] || firebaseErrorMessages.default;
      dispatch(setError(errorMessage));  // Handle errors from Firebase
      dispatch(clearLoading());
    } finally {
      dispatch(clearLoading());
    }
  }