// car_rental_app_react_frontend\src\Components\CarList\CarList.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        cars: state.cars,
    };
};

const CarList = (props) => {
    console.log(props.cars);
    const params = useParams();
    const { category } = params;
    return (
        <div>
            <h2
                style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    marginBottom: "15px",
                }}
            >
                {category}
            </h2>
        </div>
    );
};

export default connect(mapStateToProps)(CarList);
