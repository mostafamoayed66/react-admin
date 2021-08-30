import axios from "../helpers/axios";
import { addressConstants } from "./constants";

const getallAddress = (payload) => {
    return async (dispatch) => {
        dispatch({ type: addressConstants.GET_ALL_CUSTOMER_ADDRESS_REQUEST });
        try {
            const res = await axios.post("/user/getaddresses");
            const { userAddress } = res.data;
            if (res.status === 200) {
                const address = userAddress;
                dispatch({
                    type: addressConstants.GET_ALL_CUSTOMER_ADDRESS_SUCCESS,
                    payload: { address },
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: addressConstants.GET_ALL_CUSTOMER_ADDRESS_FAILURE,
                    payload: { error },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};


export const deleteAddressById = (addressId) => {
    return async (dispatch) => {
        try {
            const res = await axios.delete(`/user/deleteaddress/${addressId}`);
            dispatch({ type: addressConstants.DELETE_ADDRESS_BY_ID_REQUEST });
            if (res.status === 202) {
                dispatch({ type: addressConstants.DELETE_ADDRESS_BY_ID_SUCCESS });
                dispatch(getallAddress());
            } else {
                const { error } = res.data;
                dispatch({
                    type: addressConstants.DELETE_ADDRESS_BY_ID_FAILURE,
                    payload: {
                        error,
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export {
    getallAddress
}