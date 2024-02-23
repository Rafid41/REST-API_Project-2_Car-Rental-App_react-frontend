// src\Components\Header\Header.js
// Navigation bar
import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        // firebase login/signup token for auto login
        token: state.token,
        account_type: state.account_type,
    };
};

const Header = (props) => {
    let links = null;
    if (props.token === null) {
        // means not authenticated
        links = (
            <Nav className="mr-md-5">
                <NavItem>
                    <NavLink to="/login" className="NavLink">
                        Login
                    </NavLink>
                </NavItem>
            </Nav>
        );
    } else {
        links = (
            <div className="d-flex justify-content-between align-items-center w-100">
                <Nav className="mr-md-5">
                    <NavItem>
                        <NavLink to="/" className="NavLink">
                            Home
                        </NavLink>
                    </NavItem>

                    <NavItem>
                        <NavLink to="/logout" className="NavLink">
                            Logout
                        </NavLink>
                    </NavItem>
                </Nav>

                <Nav className="ml-auto">
                    <NavItem>
                        <p
                            style={{
                                margin: "6px",
                                color: "white",
                                fontSize: "20px",
                            }}
                        >
                            @{props.account_type} account
                        </p>
                    </NavItem>
                </Nav>
            </div>
        );
    }
    return (
        <div className="Navigation">
            <Navbar
                style={{
                    backgroundColor: "#D70F64",
                    height: "70px",
                }}
            >
                {/* mr == margin-right, ml==margin-left, md=medium screen */}
                {/* "Brand" className ta custom css file er class */}
                {/* <NavbarBrand href="/" className="mr-auto ml-md-5 Brand">
                    Home
                </NavbarBrand> */}

                {links}
            </Navbar>
        </div>
    );
};

export default connect(mapStateToProps)(Header);
