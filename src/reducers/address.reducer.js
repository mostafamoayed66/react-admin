import { addressConstants } from "../actions/constants";

const initState = {
    alladdress: [],
};

const getlastName = (item) => {
    const lastName = { ...item, userlastName: [item.user.lastName].join(" ") };
    return lastName;
};
const getName = (item) => {
    const Name = { ...item, userName: [item.user.firstName].join(" ") };
    return Name;
};
const getAddress = (item) => {
    const Email = { ...item, userEmail: [item.user.email].join(" ") };
    return Email;
};
const getDetails = (value) => {
    const Userlastname = value.map(getlastName);
    const Username = Userlastname.map(getName);
    const UserDetail = Username.map(getAddress);
    return UserDetail
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
    switch (action.type) {
        case addressConstants.GET_CUSTOMER_ADDRESS_REQUEST:
            state = {
                ...state
            }
            break;
        case addressConstants.GET_ALL_CUSTOMER_ADDRESS_SUCCESS:
            state = {
                ...state,
                alladdress: getDetails(action.payload.address),
            }
            break;
        case addressConstants.GET_ALL_CUSTOMER_ADDRESS_FAILURE:
            state = {
                ...state,
                error: action.payload.error
            }
            break;
            
        case addressConstants.DELETE_ADDRESS_BY_ID_REQUEST:
            state = {
                ...state
            }
            break;
        case addressConstants.DELETE_ADDRESS_BY_ID_SUCCESS:
            state = {
                ...state,
            }
            break;
        case addressConstants.DELETE_ADDRESS_BY_ID_FAILURE:
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
