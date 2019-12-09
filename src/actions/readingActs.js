import storyApi from '../api/truyencvApi';
import {LIST_READING, CREATE_READING, DELETE_READING} from '../core/actionTypes';
import history from '../history';

export const search = (data) => {
    return async(dispatch) => {         
        
        if(!data.keyword){
            data.keyword = '';
        }
        
        const response = await storyApi.post(`/readingstory/search/`,{skip: data.skip, take: data.take},{            
            headers:{
                accept : 'application/json',
                'content-type' : 'application/json'
            }
        });

        dispatch({ type: LIST_READING, payload: response.data });
    }
}

export const create = (data) => {    
    return async (dispatch) => {         
        const response = await storyApi.post(`/readingstory/create`,data,{            
            headers:{
                accept : 'application/json',
                'content-type' : 'application/json'
            }
        });

        dispatch({ type: CREATE_READING, payload: response.data });
        history.push('/reading');
    }
}

export const remove = (data) => {    
    return async (dispatch) => {          
      
        const response = await storyApi.post(`/readingstory/delete/`,data,{            
            headers:{
                accept : 'application/json',
                'content-type' : 'application/json'
            }
        });

        dispatch({ type: DELETE_READING, payload: response.data });
        history.push(`/reading`);
    }
}