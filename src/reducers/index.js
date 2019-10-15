import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import storyReducer from './storyReducers';

export default combineReducers({
    form: formReducer,
    story : storyReducer 
});