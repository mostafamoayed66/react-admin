import { productConstants } from "../actions/constants";

const initialState = {
    products: []
};


const getCategoryName = (item) => {
    const fullname = { ...item, categoryname : [item.category.name].join(" ")};
    return fullname;
};
const getCategory = (value) => {
    const addCategoryName = value.map(getCategoryName);
    return addCategoryName
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: getCategory(action.payload.products)
            }
            
            break;
        default:
            break;
    }

    return state;
}