import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import storyReducer from './storyReducers';
import chapterReducer from './chapterReducers';
import authorReducer from './authorReducers';


export default combineReducers({
    form: formReducer,
    story : storyReducer,
    chapter : chapterReducer,
    author : authorReducer 
});