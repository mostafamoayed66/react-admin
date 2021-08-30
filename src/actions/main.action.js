import axios from "../helpers/axios";
import { mainContants } from "./constants";


const getMainPage = () => {
    return async (dispatch) => {
        dispatch({ type: mainContants.GET_MAIN_PAGE_REQUEST });
        try {
            const res = await axios.get("/main/getMain");
            if (res.status === 200) {
                const { mains } = res.data;
                let main = mains;
                dispatch({
                    type: mainContants.GET_MAIN_PAGE_SUCCESS,
                    payload: { main },
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: mainContants.GET_MAIN_PAGE_FAILURE,
                    payload: { error },
                });
            }
        } catch (error) {
            console.log(error);
            console.log('Heavy Error');
        }
    };
};

export const addMainPage = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: mainContants.ADD_MAIN_PAGE_REQUEST });
            const res = await axios.post(`/main/addMain`, data);
            // console.log(res);
            if (res.status === 200) {
                dispatch({ type: mainContants.ADD_MAIN_PAGE_SUCCESS });
                dispatch(getMainPage());
            } else {
                const { error } = res.data;
                dispatch({ type: mainContants.ADD_MAIN_PAGE_FAILURE, payload: { error } });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const deleteMainPage = (swiperOnesId, pigsForDelete) => {
    return async (dispatch) => {
        dispatch({ type: mainContants.DELETE_MAIN_PAGE_REQUEST });
        try {
            const res = await axios.post(`/main/delMain/${swiperOnesId}`, pigsForDelete);
            if (res.status === 202) {
                dispatch({ type: mainContants.DELETE_MAIN_PAGE_SUCCESS });
                dispatch(getMainPage());
            } else {
                const { error } = res.data;
                dispatch({ type: mainContants.DELETE_MAIN_PAGE_FAILURE, payload: { error } });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export {
    getMainPage
}