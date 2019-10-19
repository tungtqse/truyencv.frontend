import storyApi from '../api/truyencvApi';
import {LIST_CHAPTER, GET_CHAPTER} from '../core/actionTypes';
import history from '../history';

export const search = (data) => {
    return async(dispatch) => {   

        const response = await storyApi.post(`/chapter/search/`,{storyId: data.id, skip: data.skip, take: data.take},{            
            headers:{
                accept : 'application/json',
                'content-type' : 'application/json'
            }
        });

        dispatch({ type: LIST_CHAPTER, payload: response.data });
    }
}

export const show = (storyId,numberChapter) => {
    return async(dispatch) => {    
        
        const response = await storyApi.post(`/chapter/get/`,{storyId: storyId, numberChapter: numberChapter},{            
            headers:{
                accept : 'application/json',
                'content-type' : 'application/json'
            }
        });

        dispatch({ type: GET_CHAPTER, payload: response.data });
    }
}