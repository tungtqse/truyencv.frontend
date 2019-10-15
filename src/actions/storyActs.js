import storyApi from '../api/truyencvApi';
import {CREATE_STORY, DELETE_STORY, EDIT_STORY, GET_STORY, LIST_STORY} from '../core/actionTypes';
import history from '../history';

export const search = (data) => {
    return async(dispatch) => {          
        debugger
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
