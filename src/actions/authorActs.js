import storyApi from '../api/truyencvApi';
import {LIST_AUTHOR} from '../core/actionTypes';
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