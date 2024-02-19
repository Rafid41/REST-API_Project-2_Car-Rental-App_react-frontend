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
};

export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // AUTH cases:
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
                account_type: action.payload.account_type,
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
