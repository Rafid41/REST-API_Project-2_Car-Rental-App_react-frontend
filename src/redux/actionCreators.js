// src\redux\actionCreators.js
import * as actionTypes from "./actionTypes";
import axios from "axios";

// hostURL for backend //localhost
const hostUrl = "http://localhost:8000";
// const hostUrl = "https://Rafid8205.pythonanywhere.com"; // //adding https or http is important

// =================== LoadingScreen ==========================//
export const LoadingScreen = (load) => {
    return {
        type: actionTypes.AUTH_LOADING,
        payload: load,
    };
};

// ====================get Categories =================//
export const getCategories = () => (dispatch) => {
    dispatch(LoadingScreen(true));

    axios
        .get(`${hostUrl}/api/categories/`)
        .then((res) => {
            dispatch(getCategoriesHelper(res.data));
            dispatch(LoadingScreen(false));
        })
        .catch((err) => {
            console.log("error fetching categories");
            dispatch(LoadingScreen(false));
        });
};

export const getCategoriesHelper = (category) => {
    return {
        type: actionTypes.GET_CATEGORIES,
        payload: {
            category: category,
        },
    };
};

// ====================== upload car ====================//
export const AddNewCar = (newCar) => (dispatch) => {
    dispatch(LoadingScreen(true));
    axios
        .post(`${hostUrl}/api/cars/`, newCar, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            dispatch(LoadingScreen(false));
            alert("Car Added successfully");
        })
        .catch((err) => {
            dispatch(LoadingScreen(false));
            console.log(err);
        });
};

// ==================== getCarList ==========================//
export const getCar = () => (dispatch) => {
    axios
        .get(`${hostUrl}/api/cars/`)
        .then((res) => {
            dispatch(getCarHelper(res.data));
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getCarHelper = (cars) => {
    return {
        type: actionTypes.GET_CARS,
        payload: {
            cars: cars,
        },
    };
};

// // ================= update car/ Renting =====================//
// export const updateRent = (updated_car, car_id) => (dispatch) => {
//     // needed id to update
//     // put for replace
//     // patch for some field update
//     // ekahne changed field gula update kora hoise , all field na
//     axios
//         .patch(`${hostUrl}/api/cars/${car_id}/`, updated_car, {
//             headers: {
//                 "Content-Type": "multipart/form-data",
//             },
//         })
//         .then((res) => {
//             alert("Car Rented successfully");

//             // refresh to homepage
//             setTimeout(() => {
//                 window.location.reload();
//             }, 1000);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };

// ===================== get CarBookingDates ===================//
export const getCarBookingDates = () => (dispatch) => {
    axios
        .get(`${hostUrl}/api/car_booking_dates/`)
        .then((res) => {
            dispatch(getCarBookingDatesHelper(res.data));
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getCarBookingDatesHelper = (bookingDates) => {
    return {
        type: actionTypes.GET_CAR_BOOKING_DATES,
        payload: {
            bookingDates: bookingDates,
        },
    };
};

// ===================== post book info ====================//
export const postCarBookInfo = (info) => (dispatch) => {
    dispatch(LoadingScreen(true));
    axios
        .post(`${hostUrl}/api/car_booking_dates/`, info)
        .then((res) => {
            // update book list
            dispatch(getCarBookingDates());
            dispatch(LoadingScreen(false));
            alert("Car Booked successfully");
        })
        .catch((err) => {
            dispatch(LoadingScreen(false));
            console.log(err);
        });
};
