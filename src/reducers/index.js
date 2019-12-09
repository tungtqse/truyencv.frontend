import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import storyReducer from './storyReducers';
import chapterReducer from './chapterReducers';
import authorReducer from './authorReducers';
import searchReducer from './searchReducers';
import readingReducer from './readingReducers';

export default combineReducers({
    form: formReducer,
    story : storyReducer,
    chapter : chapterReducer,
    author : authorReducer,
    search: searchReducer,
    reading: readingReducer 
});