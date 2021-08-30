import authReducer from './auth.reducers';
import userReducer from './user.reducer';
import initialDataReducer from './initialData.reducer';
import productReducer from './product.reducer';
import categoryReducer from './category.reducer';
import orderReducer from './order.reducer';
import addressReducer from './address.reducer';
import mainReducer from './main.reducer';
import { combineReducers } from 'redux';

const initialState = {
    sidebarShow: 'responsive'
}

const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case 'set':
            return { ...state, ...rest }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    nav: changeState,
    auth: authReducer,
    user: userReducer,
    initialData: initialDataReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
    address: addressReducer,
    main: mainReducer,
});

export default rootReducer;