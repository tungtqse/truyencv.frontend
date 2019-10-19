import storyApi from '../api/truyencvApi';
import {CREATE_STORY, DELETE_STORY, EDIT_STORY, GET_STORY, LIST_STORY} from '../core/actionTypes';
import history from '../history';

export const search = (data) => {
    return async(dispatch) => {         
        
        if(!data.keyword){
            data.keyword = '';
        }
        
        const response = await storyApi.post(`/story/search/`,{keyword: data.keyword, skip: data.skip, take: data.take},{            
            headers:{
                accept : 'application/json',
                'content-type' : 'application/json'
            }
        });

        dispatch({ type: LIST_STORY, payload: response.data });
    }
}

export const show = (id) => {
    return async(dispatch) => {    
        
        const response = await storyApi.post(`/story/get/`,{id: id},{            
            headers:{
                accept : 'application/json',
                'content-type' : 'application/json'
            }
        });

        dispatch({ type: GET_STORY, payload: response.data });
    }
}

export const edit = (data) => {    
    return async (dispatch) => {  
        
        const {id} = data;
        const response = await storyApi.post(`/story/update/`,data,{            
            headers:{
                accept : 'application/json',
                'content-type' : 'application/json'
            }
        });

        dispatch({ type: EDIT_STORY, payload: response.data });
        history.push(`/story/${id}`);
    }
}

export const create = (data) => {    
    return async (dispatch) => {         
        const response = await storyApi.post(`/story/create`,data,{            
            headers:{
                accept : 'application/json',
                'content-type' : 'application/json'
            }
        });

        dispatch({ type: CREATE_STORY, payload: response.data });
        history.push('/');
    }
}
