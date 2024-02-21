// src\redux\reducer.js
import * as actionTypes from "./actionTypes";
// import { authLoading } from "./authActionCreators";

const INITIAL_STATE = {
    token: null,
    userId: null,
    // for auth spinner
    authLoading: false,
    // for auth error
    authFailedMsg: null,
    account_type: null,
    user_email: null,
    categories: [],
    cars: [],
};

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // get cars
        case actionTypes.GET_CARS:
            return {
                ...state,
                cars: action.payload.cars,
            };

        //get Categories
        case actionTypes.GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload.category,
            };

        // AUTH cases:
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
                account_type: action.payload.account_type,
                user_email: action.payload.email,
            };

        //logout
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                authFailedMsg: null,
            };

        case actionTypes.AUTH_LOADING:
            return {
                ...state,
                authLoading: action.payload,
            };

        // authentication error
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                authFailedMsg: action.payload,
            };

        default:
            return state;
    }
};
