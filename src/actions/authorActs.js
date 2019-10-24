import storyApi from '../api/truyencvApi';
import {LIST_AUTHOR, GET_AUTHOR, EDIT_AUTHOR, CREATE_AUTHOR} from '../core/actionTypes';
import history from '../history';

export const search = (data) => {
    return async(dispatch) => {         
        
        if(!data.keyword){
            data.keyword = '';
        }
        
        const response = await storyApi.post(`/author/search/`,{keyword: data.keyword, skip: data.skip, take: data.take},{            
            headers:{
                accept : 'application/json',
                'content-type' : 'application/json'
            }
        });

        dispatch({ type: LIST_AUTHOR, payload: response.data });
    }
}

export const show = (id) => {
    return async(dispatch) => {
       
        const response = await storyApi.post(`/author/get/`,{id: id},{            
            headers:{
                accept : 'application/json',
                'content-type' : 'application/json'
            }
        });

        dispatch({ type: GET_AUTHOR, payload: response.data });
    }
}

export const edit = (data) => {    
    return async (dispatch) => {  
        
        const {id} = data;
        const response = await storyApi.post(`/author/update/`,data,{            
            headers:{
                accept : 'application/json',
                'content-type' : 'application/json'
            }
        });

        dispatch({ type: EDIT_AUTHOR, payload: response.data });
        history.push(`/author/${id}`);
    }
}

export const create = (data) => {    
    return async (dispatch) => {         
        const response = await storyApi.post(`/author/create`,data,{            
            headers:{
                accept : 'application/json',
                'content-type' : 'application/json'
            }
        });

        dispatch({ type: CREATE_AUTHOR, payload: response.data });
        history.push('/author');
    }
}
