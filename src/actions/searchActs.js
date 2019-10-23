import storyApi from '../api/truyencvApi';
import {SEARCH} from '../core/actionTypes';

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

        dispatch({ type: SEARCH, payload: response.data });
    }
}