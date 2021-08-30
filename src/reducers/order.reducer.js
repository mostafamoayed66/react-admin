import { orderConstants } from "../actions/constants";

const initState = {
    orders: []
};

const getlastNameUser = (item) => {
    const lastName = { ...item, userlastName: [item.user.lastName].join(" ") };
    return lastName;
};
const getNameUser = (item) => {
    const Name = { ...item, Username: [item.user.firstName].join(" ") };
    return Name;
};
const getEmailUser = (item) => {
    const Email = { ...item, Useremail: [item.user.email].join(" ") };
    return Email;
};
const getUserDetails = (value) => {
    const Username = value.map(getNameUser);
    const Userlastname = Username.map(getlastNameUser);
    const UserDetail = Userlastname.map(getEmailUser);
    return UserDetail
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
    switch (action.type) {
        case orderConstants.GET_CUSTOMER_ORDER_REQUEST:
            state = {
                ...state
            }
            break;
        case orderConstants.GET_CUSTOMER_ORDER_SUCCESS:
            state = {
                ...state,
                orders: getUserDetails(action.payload.orders)
            };
            break;
        case orderConstants.GET_CUSTOMER_ORDER_FAILURE:
            state = {
                ...state,
                error: action.payload.error
            }
            break;

        case orderConstants.DELETE_CUSTOMER_ORDER_REQUEST:
            state = {
                ...state
            }
            break;
        case orderConstants.DELETE_CUSTOMER_ORDER_SUCCESS:
            state = {
                ...state
            }
            break;
        case orderConstants.DELETE_CUSTOMER_ORDER_FAILURE:
            state = {
                ...state,
                error: action.payload.error
            }
            break;
        default:
            break;
    }

    return state;
};
