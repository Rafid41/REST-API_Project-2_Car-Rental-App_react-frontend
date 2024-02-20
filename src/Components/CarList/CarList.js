// car_rental_app_react_frontend\src\Components\CarList\CarList.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        cars: state.cars,
    };
};

const CarList = (props) => {
    const params = useParams();
    const { category, category_index } = params;
    const currentTime = new Date().getTime();
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

            <ListGroup>
                {props.cars.map((car, index) => {
                    if (
                        car.car_category === parseInt(category_index) &&
                        (car.expire_time == null ||
                            currentTime > car.expire_time)
                    ) {
                        return (
                            <Link
                                to={`/car_list/${category}`}
                                key={index}
                                style={{ textDecoration: "None" }}
                            >
                                <ListGroupItem action>
                                    <p
                                        style={{
                                            fontSize: "20px",
                                            padding: "5px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {car.car_name}
                                    </p>
                                </ListGroupItem>
                            </Link>
                        );
                    }
                    return null;
                })}
            </ListGroup>
        </div>
    );
};

export default connect(mapStateToProps)(CarList);
