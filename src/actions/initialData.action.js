import {
    initialDataConstants,
    categoryConstansts,
} from "./constants";
import axios from "../helpers/axios";

export const getInitialData = () => {
    return async (dispatch) => {
        const res = await axios.post(`/initialData`);
        if (res.status === 200) {
            const { categories, memberWithAddresses, members, admins } = res.data;
            dispatch({
                type: categoryConstansts.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories },
            });
            dispatch({
                type: initialDataConstants.GET_ALL_INITIAL_DATA_SUCCESS,
                payload: { memberWithAddresses, members, admins },
            });
        }
    };
};
