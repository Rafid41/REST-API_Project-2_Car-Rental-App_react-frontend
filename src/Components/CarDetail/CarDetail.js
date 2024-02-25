// car_rental_app_react_frontend\src\Components\CarDetail\CarDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    getCarBookingDates,
    postCarBookInfo,
} from "../../redux/actionCreators";
import { connect } from "react-redux";
import "../../App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Spinner } from "reactstrap";

// ======================== redux ======================//
const mapStateToProps = (state) => {
    return {
        account_type: state.account_type,
        cars: state.cars,
        booking_date_details: state.booking_date_details,
        authLoading: state.authLoading,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        // updateRent: (RentCar, car_id) => dispatch(updateRent(RentCar, car_id)),
        getCarBookingDates: () => dispatch(getCarBookingDates()),
        postCarBookInfo: (info) => dispatch(postCarBookInfo(info)),
    };
};

//========================= main fn =============================//
const CarDetail = (props) => {
    const params = useParams();
    const { carString, categoryString } = params;
    const [showform, setShowform] = useState(false);
    const [openFormButtonValue, setOpenFormButtonValue] = useState(true);
    const [selectedDate, setSelectedDate] = useState(null);

    const openForm = () => {
        setShowform(true);
        setOpenFormButtonValue(false);
    };

    // get the object from carString
    const car = JSON.parse(decodeURIComponent(carString));
    const category = JSON.parse(decodeURIComponent(categoryString));

    // ============== check if the date and car_id existed or not =================//
    const checkDateAndCar = () => {
        const findCar = props.booking_date_details.find(
            (detail) =>
                detail.car_id === car.id && detail.booking_date === selectedDate
        );
        return findCar ? true : false;
    };

    // ======================= submit btn =======================//
    const submitButton = () => {
        if (selectedDate == null) {
            alert("Please select a date");
        } else if (checkDateAndCar()) {
            alert("This date is already booked, select another one");
        } else {
            const bookInfo = {
                booking_date: selectedDate,
                car_id: car.id,
                booker_id: localStorage.getItem("userId"),
            };
            props.postCarBookInfo(bookInfo);
        }
    };

    // ============================= input Area =======================//
    let inputArea = null;
    if (props.authLoading) {
        inputArea = (
            <div>
                <center>
                    <Spinner />
                </center>
            </div>
        );
    } else {
        inputArea = (
            <div
                style={{
                    border: "3px solid aqua",
                    padding: "2rem",
                    borderRadius: "10px",
                    textAlign: "center",
                }}
            >
                <DatePicker
                    className="form-control"
                    selected={selectedDate ? new Date(selectedDate) : null}
                    onChange={(date) =>
                        setSelectedDate(date.toLocaleDateString("en-BD"))
                    }
                    dateFormat="dd/MM/yyyy" // Customize date format as needed
                    placeholderText="Select a date"
                />
                <br />
                <br />
                <button className="btn btn-success" onClick={submitButton}>
                    Confirm
                </button>
            </div>
        );
    }

    const OpenFormButton = (
        <button className="btn btn-info form-control" onClick={openForm}>
            <span style={{ fontWeight: "bold" }}>Rent Car</span>
        </button>
    );

    return (
        <div className="container">
            <h2
                style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    marginBottom: "15px",
                }}
            >
                Car Detail
            </h2>
            <br />
            <center>
                <img src={car.car_photo} width={500} height={320} />
                <br />
                <br />

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        textAlign: "left",
                        marginLeft: "30%",
                        marginRight: "30%",
                    }}
                >
                    <p
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <span className="carDetail_label">Car Model: </span>
                        <span className="carDetail_info">{car.car_name}</span>
                    </p>
                    <p
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <span className="carDetail_label">
                            Registration Number:{" "}
                        </span>
                        <span className="carDetail_info">{car.car_number}</span>
                    </p>
                    <p
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <span className="carDetail_label">Vehicle Type: </span>
                        <span className="carDetail_info">
                            {category.category_name}
                        </span>
                    </p>
                    <p
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <span className="carDetail_label">Price Per Day: </span>
                        <span className="carDetail_info">
                            {car.price_per_day} BDT
                        </span>
                    </p>
                    <br />
                    <br />
                    {openFormButtonValue &&
                        props.account_type == "Client" &&
                        OpenFormButton}
                    <br />
                    {showform && inputArea}
                </div>
            </center>
            <br />
            <br />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(CarDetail);
