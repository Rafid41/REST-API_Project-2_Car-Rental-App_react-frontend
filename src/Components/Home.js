// car_rental_app_react_frontend\src\Components\Home.js
import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        account_type: state.account_type,
    };
};

const Home = (props) => {
    return (
        <div>
            <p>{props.account_type}</p>
        </div>
    );
};

export default connect(mapStateToProps)(Home);
