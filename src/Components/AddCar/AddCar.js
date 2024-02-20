// car_rental_app_react_frontend\src\Components\AddCar\AddCar.js
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { AddNewCar } from "../../redux/actionCreators";
import "../../App.css";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
    return {
        AddNewCar: (newCar) => dispatch(AddNewCar(newCar)),
    };
};

const AddCar = (props) => {
    const [carPhoto, setCarPhoto] = useState(null);
    console.log(props.categories);

    return (
        <div className="container" style={{ textAlign: "center" }}>
            <h2
                style={{
                    fontWeight: "bold",
                    color: "#a109ed",
                }}
            >
                Add New Car
            </h2>
            <br />
            <Formik
                initialValues={{
                    car_name: "",
                    car_number: "",
                    booked_time: "",
                    expire_time: "",
                    price_per_day: "",
                    car_photo: "",
                    owner: "",
                    booker: "",
                    car_category: "",
                }}
                onSubmit={(values) => {
                    console.log(values);
                    console.log(carPhoto);

                    // object which will passed to json
                    const newCar = {
                        car_name: values.car_name,
                        car_number: values.car_number,
                        booked_time: null,
                        expire_time: null,
                        price_per_day: values.price_per_day,
                        car_photo: carPhoto,
                        owner: localStorage.getItem("userId"),
                        booker: null,
                        car_category: values.car_category,
                    };

                    props.AddNewCar(newCar);
                }}
            >
                {({ values, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="addCar_label" htmlFor="car_name">
                                Car Name
                            </label>
                            <Field
                                type="text"
                                id="car_name"
                                name="car_name"
                                className="form-control"
                                required
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label
                                className="addCar_label"
                                htmlFor="car_number"
                            >
                                Car Number
                            </label>
                            <Field
                                type="text"
                                id="car_number"
                                name="car_number"
                                className="form-control"
                                required
                            />
                        </div>
                        <br />

                        <div className="form-group">
                            <label
                                className="addCar_label"
                                htmlFor="price_per_day"
                            >
                                Price Per Day
                            </label>
                            <Field
                                type="text"
                                id="price_per_day"
                                name="price_per_day"
                                className="form-control"
                                required
                            />
                        </div>
                        <br />
                        <label className="addCar_label">Select Car Image</label>
                        <div className="form-group">
                            <input
                                id="car_photo"
                                name="car_photo"
                                type="file"
                                onChange={(event) => {
                                    setCarPhoto(event.currentTarget.files[0]);
                                }}
                                className="form-control"
                                required
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <label
                                className="addCar_label"
                                htmlFor="car_category"
                            >
                                Car Category
                            </label>
                            <Field
                                as="select"
                                id="car_category"
                                name="car_category"
                                className="form-control"
                                required
                            >
                                <option value="">Select Category</option>
                                {props.categories.map((category, index) => (
                                    <option key={category} value={index + 1}>
                                        {category}
                                    </option>
                                ))}
                            </Field>
                        </div>
                        <br />
                        <button type="submit" className="btn btn-success">
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default connect(null, mapDispatchToProps)(AddCar);
