import _ from 'lodash';
import {SEARCH} from '../core/actionTypes';

const INTIAL_STATE = {    
    code : null,
    isSuccessful: null,
    messages : null,
    data: {},
    count : 0
}

export default (state = INTIAL_STATE, action) => {
    switch(action.type){
        case SEARCH: {
            
            const {code,isSuccessful,messages, count} = action.payload;
            const data = _.mapKeys(action.payload.data, 'id');
            
            return {...state, code,isSuccessful,messages, count, data};
        }        
        default :{
            return state;
        }
    }
}