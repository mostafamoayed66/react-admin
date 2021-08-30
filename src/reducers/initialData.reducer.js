import { initialDataConstants } from "../actions/constants";

const initState = {
    memberWithAddress: 0,
    member: 0,
    admin: 0
};


// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
    switch (action.type) {
        case initialDataConstants.GET_ALL_INITIAL_DATA_SUCCESS:
            state = {
                ...state,
                memberWithAddress: action.payload.memberWithAddresses,
                member: action.payload.members,
                admin: action.payload.admins
            };
            break;
        default:
            break;
    }

    return state;
};
