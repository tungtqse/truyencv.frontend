import _ from 'lodash';
import {LIST_CHAPTER, GET_CHAPTER, BOOKMARK_CHAPTER} from '../core/actionTypes';

const INTIAL_STATE = {    
    code : null,
    isSuccessful: null,
    messages : null,
    data: {},
    count : 0
}

export default (state = INTIAL_STATE, action) => {
    switch(action.type){
        case LIST_CHAPTER: {
            
            const {code,isSuccessful,messages, count} = action.payload;
            const data = _.mapKeys(action.payload.data, 'id');
            
            return {...state, code,isSuccessful,messages, count, data};
        }
        case GET_CHAPTER:{            
            const {code,isSuccessful,messages, data} = action.payload;   
            const {count} = INTIAL_STATE;        
            return {...state, code,isSuccessful,messages, count, data};
        }
        // case BOOKMARK_CHAPTER:{            
        //     const {code,isSuccessful,messages, data} = action.payload;   
        //     const {count} = INTIAL_STATE;        
        //     return {...state, code,isSuccessful,messages, count, data};
        // }
        default :{
            return state;
        }
    }
}