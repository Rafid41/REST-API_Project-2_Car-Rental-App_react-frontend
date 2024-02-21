// car_rental_app_react_frontend\src\Components\CarDetail\CarDetail.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { updateRent } from "../../redux/actionCreators";
import { connect } from "react-redux";
import "../../App.css";

const mapDispatchToProps = (dispatch) => {
    return {
        updateRent: (RentCar, car_id) => dispatch(updateRent(RentCar, car_id)),
    };
};

const CarDetail = (props) => {
    const params = useParams();
    const { carString, categoryString } = params;
    const [showform, setShowform] = useState(false);
    const [inputValues, setInputValues] = useState(null);
    const [openFormButtonValue, setOpenFormButtonValue] = useState(true);

    const openForm = () => {
        setShowform(true);
        setOpenFormButtonValue(false);
    };

    // get the object from carString
    const car = JSON.parse(decodeURIComponent(carString));
    const category = JSON.parse(decodeURIComponent(categoryString));

    const submitButton = () => {
        if (inputValues == null) {
            alert("Please input the number of days");
        } else {
            let currentTime = new Date().getTime();

            // uppdate korbo only modified field gula, jegula unchanged segula na
            // 'patch' use kora hbe, not 'put'
            const RentCar = {
                booked_time: currentTime,
                expire_time: currentTime + inputValues * 24 * 60 * 60 * 1000,
                booker: Number(localStorage.getItem("userId")),
            };
            props.updateRent(RentCar, car.id);
        }
    };

    const inputArea = (
        <div
            style={{
                border: "3px solid aqua",
                padding: "2rem",
                borderRadius: "10px",
                textAlign: "center",
            }}
        >
            <input
                type="number"
                className="form-control"
                placeholder="For How Many days?"
                value={inputValues}
                onChange={(event) => {
                    setInputValues(event.target.value);
                }}
            />
            <br />
            <button className="btn btn-success" onClick={submitButton}>
                Confirm
            </button>
        </div>
    );

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
                    {openFormButtonValue && OpenFormButton}
                    <br />
                    {showform && inputArea}
                </div>
            </center>
            <br />
            <br />
        </div>
    );
};

export default connect(null, mapDispatchToProps)(CarDetail);