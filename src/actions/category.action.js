import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

 const getAllCategory = () => {
    //asynchronous actions
    return async dispatch => {
        dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });

        const res = await axios.get(`http://localhost:2000/api/category/getcategory`)
        console.log(res)

        if (res.status === 201) {
            const { categoryList } = res.data;

            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories: categoryList }
            })
        } else {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}

export const addCategory = (form) => {
    return async dispatch => {
        dispatch({ type: categoryConstants.ADD_NEW_CATEGORIES_REQUEST });
        try {
            const res = await axios.post(`http://localhost:2000/api/category/create`, form);
            if (res.status === 201) {
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORIES_SUCCESS,
                    payload: { category: res.data.category }
                })
            }else {
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORIES_FAILURE,
                    payload: { error: res.data.error }
                });
            }  
        } catch (error) {
            console.log(error.response)
        }
        
        
    }
}

export const updateCategories = (form) => {
    //dispatch return a promise
    return async dispatch => {
      dispatch({type:categoryConstants.UPDATE_CATEGORIES_REQUEST});
        const res = await axios.post(`http://localhost:2000/api/category/update`, form);
        if (res.status === 201) {
            dispatch({type:categoryConstants.UPDATE_CATEGORIES_SUCCESS})
            dispatch(getAllCategory())
           
       
        }else {
         const {error} =res;
         dispatch({
            type:categoryConstants.UPDATE_CATEGORIES_FAILURE,
            payload:{error}
         })
        }
        
    }
}

export const deleteCategories = (ids) => {
    //dispatch return a promise
    return async dispatch => {
      dispatch({type:categoryConstants.DELETE_CATEGORIES_REQUEST});
        const res = await axios.post(`http://localhost:2000/api/category/delete`,{
            payload:{
                ids
            }
        });
      if(res.status==201){
        dispatch(getAllCategory());
        dispatch({type:categoryConstants.DELETE_CATEGORIES_SUCCESS})
      }else{
        const {error}=res.data;
       dispatch({
        type:categoryConstants.DELETE_CATEGORIES_FAILURE,
        payload:{error}
       })
      }
        
    }
}

export{
    getAllCategory
}