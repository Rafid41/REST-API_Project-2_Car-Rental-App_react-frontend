// src\Components\Auth\Auth.js
import React, { Component } from "react";
import { Formik } from "formik";
import { auth } from "../../redux/authActionCreators";
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";
import { Alert } from "reactstrap";
import "./Auth.css";

// eta authActionCreators e dispatch korbe
const mapDispatchToProps = (dispatch) => {
    return {
        auth: (email, password, mode, accountType) =>
            dispatch(auth(email, password, mode, accountType)),
    };
};

const mapStateToProps = (state) => {
    return {
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMsg,
    };
};

class Auth extends Component {
    //same form for login and sign up
    state = {
        mode: "Sign Up",
    };

    switchModeHandler = () => {
        this.setState({
            mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up",
        });
    };
    render() {
        let error = null;
        if (this.props.authFailedMsg !== null) {
            error = <Alert color="danger">{this.props.authFailedMsg}</Alert>;
        }

        let form = null;
        if (this.props.authLoading) {
            form = <Spinner />;
        } else {
            form = (
                <Formik
                    initialValues={
                        // j field gulo thakbe auth page e
                        {
                            email: "",
                            password: "",
                            passwordConfirm: "",
                            accountType: "Client",
                        }
                    }
                    onSubmit={(values) => {
                        this.props.auth(
                            values.email,
                            values.password,
                            this.state.mode,
                            values.accountType
                        );
                    }}
                    //==================== validation ==================//
                    // for validation, built in props
                    // validation check failed hole r shamne agabe na
                    validate={(values) => {
                        const errors = {};
                        // empty kina
                        if (!values.email) {
                            errors.email = "Required";
                        }
                        // email adds invalid kina
                        else if (
                            !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(
                                values.email
                            )
                        ) {
                            errors.email = "Invalid email address";
                        }

                        //password
                        if (!values.password) {
                            errors.password = "Required";
                        } else if (values.password.length < 4) {
                            errors.password =
                                "Password must be at least 4 characters!";
                        }

                        // pass confirm
                        if (this.state.mode === "Sign Up") {
                            if (!values.passwordConfirm) {
                                errors.passwordConfirm = "Required";
                            } else if (
                                values.password !== values.passwordConfirm
                            ) {
                                errors.passwordConfirm =
                                    "Password field does not match";
                            }
                        }

                        //console.log("Errors",errors);
                        return errors;
                    }}
                >
                    {/* ei fn er vitor form render kora hbe */}
                    {/* handleChange built in formik fn, er maddhome field er value auto form e upate hy */}
                    {/* handleSubmit o built in fn */}
                    {/* errors => to show errors under field input */}
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <div
                            style={{
                                border: "1px grey solid",
                                padding: "30px",
                                borderRadius: "7px",
                            }}
                        >
                            {/* switch to login/signUp */}
                            <button
                                className="btn btn-lg"
                                style={{
                                    width: "100%",
                                    backgroundColor: "#D70F64",
                                    color: "white",
                                }}
                                onClick={this.switchModeHandler}
                            >
                                Switch to{" "}
                                {this.state.mode === "Sign Up"
                                    ? "Login"
                                    : "Sign Up"}
                            </button>
                            <br />
                            <br />

                            {/*    ####################  form  ##################### */}
                            <form onSubmit={handleSubmit}>
                                <div className="text-center">
                                    {/* field "name" will be same as initialValues field_names */}
                                    <label className="label_name">Email</label>
                                    <input
                                        name="email"
                                        className="form-control"
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                    <span style={{ color: "red" }}>
                                        {errors.email}
                                    </span>

                                    <br />
                                    <label className="label_name">
                                        Password
                                    </label>
                                    <input
                                        name="password"
                                        className="form-control"
                                        value={values.password}
                                        onChange={handleChange}
                                    />
                                    <span style={{ color: "red" }}>
                                        {errors.password}
                                    </span>

                                    <br />
                                    {/* mode=="Sign Up" hole ei part dekhabe, nahole kisuna(null) dekhabe */}
                                    {this.state.mode === "Sign Up" ? (
                                        <div>
                                            <label className="label_name">
                                                Confirm Password
                                            </label>
                                            <input
                                                name="passwordConfirm"
                                                className="form-control"
                                                value={values.passwordConfirm}
                                                onChange={handleChange}
                                            />
                                            <span style={{ color: "red" }}>
                                                {errors.passwordConfirm}
                                            </span>
                                            <br />
                                            <div>
                                                <label className="label_name">
                                                    Account Type
                                                </label>
                                                <select
                                                    name="accountType"
                                                    className="form-control"
                                                    value={values.accountType}
                                                    onChange={handleChange}
                                                >
                                                    <option value="Client">
                                                        Client
                                                    </option>
                                                    <option value="Owner">
                                                        Owner
                                                    </option>
                                                </select>
                                            </div>

                                            <br />
                                        </div>
                                    ) : null}

                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                    >
                                        {this.state.mode === "Sign Up"
                                            ? "Sign Up"
                                            : "Login"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </Formik>
            );
        }

        return (
            <div>
                {error}
                {form}
            </div>
        );
    }
}

// connect with redux
// structure connect(mapStateToProps, mapDispatchToProps)(Component_Class_name/fn_name)
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
