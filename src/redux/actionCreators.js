// src\redux\actionCreators.js
import * as actionTypes from "./actionTypes";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

// hostURL for backend
const hostUrl = "http://localhost:8000";

// ====================get Categories =================//
export const getCategories = () => (dispatch) => {
    // hosting URL

    axios
        .get(`${hostUrl}/api/categories/`)
        .then((res) => {
            // console.log(res.data);
            let category_array = [];

            for (let key in res.data) {
                category_array.push(res.data[key].category_name);
            }

            dispatch(getCategoriesHelper(category_array));
        })
        .catch((err) => {
            console.log("error fetching users");
        });
};

export const getCategoriesHelper = (category_array) => {
    return {
        type: actionTypes.GET_CATEGORIES,
        payload: {
            category_array: category_array,
        },
    };
};

// ====================== upload car ====================//
export const AddNewCar = (newCar) => (dispatch) => {
    axios
        .post(`${hostUrl}/api/cars/`, newCar, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            alert("Added car successfully");
        })
        .catch((err) => {
            console.log(err);
        });
};
