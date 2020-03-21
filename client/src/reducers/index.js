import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; // Changed the name in order to avoid confusion since we might have different reducers in the app

import authReducer from './authReducer';
import streamReducer from './streamReducer'


export default combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamReducer
});