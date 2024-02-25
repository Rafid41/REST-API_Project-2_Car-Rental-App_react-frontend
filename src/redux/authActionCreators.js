// src\redux\authActionCreators.js
import * as actionTypes from "./actionTypes";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const saveTokenDataAndGetUserID = (access, account_type, email) => {
    // decoding token
    const token = jwtDecode(access);
    localStorage.setItem("token", access);
    localStorage.setItem("userId", token.user_id);
    const expirationTime = new Date(token.exp * 1000);
    localStorage.setItem("expirationTime", expirationTime);
    localStorage.setItem("account_type", account_type);
    localStorage.setItem("email", email);

    return token.user_id;
};

// ==================== Main Authentication =================//
export const auth = (email, password, mode, accountType) => (dispatch) => {
    dispatch(authLoading(true)); // true ta payLoad hisebe pass hbe

    // hosting URL/ localhost
    const hostUrl = "http://localhost:8000";
    // const hostUrl = "https://Rafid8205.pythonanywhere.com"; //adding https or http is important

    let authData = null;

    // connecting with django backend
    let authUrl = null;
    if (mode === "Sign Up") {
        authUrl = `${hostUrl}/api/users/`;

        authData = {
            // name will be same as django field name
            email: email,
            password: password,
            account_type: accountType,
        };
    } else {
        authUrl = `${hostUrl}/api/token/`;

        authData = {
            email: email,
            password: password,
        };
    }

    axios
        .post(authUrl, authData)
        .then((response) => {
            dispatch(authLoading(false));

            if (mode === "Login") {
                // console.log(response);
                const access = response.data.access;

                // get account_type
                let account_type_login = null;
                axios.get(`${hostUrl}/api/users/`).then((res) => {
                    for (let i in res.data) {
                        if (res.data[i].email === email) {
                            account_type_login = res.data[i].account_type;

                            const user_id = saveTokenDataAndGetUserID(
                                access,
                                account_type_login,
                                email
                            );
                            dispatch(
                                authHelper(access, user_id, account_type_login)
                            );
                            dispatch(authLoading(false));
                            break;
                        }
                    }
                });
            } else {
                // Sign up
                return axios
                    .post(`${hostUrl}/api/token/`, authData)
                    .then((response) => {
                        const access = response.data.access;
                        const user_id = saveTokenDataAndGetUserID(
                            access,
                            accountType,
                            email
                        );
                        dispatch(authHelper(access, user_id, accountType));
                        dispatch(authLoading(false));
                    });
            }
        })
        .catch((err) => {
            dispatch(authLoading(false));
            // taking first key of error message
            const key = Object.keys(err.response.data)[0];
            const errorValue = err.response.data[key];
            dispatch(authFailed(errorValue));
        });
};

//auto logout actions for auth token
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("account_type");

    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

// app load holei eta call korte hbe Main.js theke
export const authCheck = () => (dispatch) => {
    const token = localStorage.getItem("token");

    if (!token) {
        // token na thakle logout
        dispatch(logout());
    } else {
        // string return kore, new Date() oitake dateTime e convert kore
        const expirationTime = new Date(localStorage.getItem("expirationTime"));

        // time expire kina chk
        if (expirationTime <= new Date()) {
            //logout
            dispatch(logout());
        } else {
            const userId = localStorage.getItem("userId");
            const account_type = localStorage.getItem("account_type");
            dispatch(authHelper(token, userId, account_type));
        }
    }
};

// ========================= helper functions ===========================//
//  eta dispatch hbe jokhn kono response ashbe firebase theke, means login/signUp hole
//  nicher auth fn theke dis[atch hye kehane ashbe, erpor reducer.js e jabe]
export const authHelper = (token, userId, account_type) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId,
            account_type: account_type,
            email: localStorage.getItem("email"),
        },
    };
};

export const authLoading = (isLoading) => {
    return {
        type: actionTypes.AUTH_LOADING,
        payload: isLoading,
    };
};

// Firbase authentication Failed
export const authFailed = (errMsg) => {
    return {
        type: actionTypes.AUTH_FAILED,
        payload: errMsg,
    };
};
