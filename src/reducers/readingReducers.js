import _ from 'lodash';
import {LIST_READING, CREATE_READING, DELETE_READING} from '../core/actionTypes';

const INTIAL_STATE = {    
    code : null,
    isSuccessful: null,
    messages : null,
    data: {},
    count : 0
}

export default (state = INTIAL_STATE, action) => {
    switch(action.type){
        case LIST_READING: {
            
            const {code,isSuccessful,messages, count} = action.payload;
            const data = _.mapKeys(action.payload.data, 'id');
            
            return {...state, code,isSuccessful,messages, count, data};
        }
        case CREATE_READING:
        case DELETE_READING:{
            const {code,isSuccessful,messages} = action.payload;                
            return {...state, code,isSuccessful,messages};
        }
        default :{
            return state;
        }
    }
}