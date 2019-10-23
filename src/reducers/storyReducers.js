import _ from 'lodash';
import {CREATE_STORY, DELETE_STORY, EDIT_STORY, GET_STORY, LIST_STORY} from '../core/actionTypes';

const INTIAL_STATE = {    
    code : null,
    isSuccessful: null,
    messages : null,
    data: {},
    count : 0
}

export default (state = INTIAL_STATE, action) => {
    switch(action.type){
        case LIST_STORY: {
            
            const {code,isSuccessful,messages, count} = action.payload;
            const data = _.mapKeys(action.payload.data, 'id');
            
            return {...state, code,isSuccessful,messages, count, data};
        }
        case GET_STORY:{
            const {code,isSuccessful,messages, data} = action.payload;   
            const {count} = INTIAL_STATE;        
            return {...state, code,isSuccessful,messages, count, data};
        }
        case CREATE_STORY:
        case EDIT_STORY:{
            const {code,isSuccessful,messages} = action.payload;                
            return {...state, code,isSuccessful,messages};
        }
        default :{
            return state;
        }
    }
}