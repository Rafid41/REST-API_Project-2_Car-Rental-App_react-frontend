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
    const { categoryString } = params;
    const category = JSON.parse(decodeURIComponent(categoryString));
    console.log(category);
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
                Availabe {category.category_name}(s)
            </h2>

            <ListGroup>
                {props.cars.map((car, index) => {
                    if (
                        car.car_category === category.id &&
                        (car.expire_time == null ||
                            currentTime > car.expire_time)
                    ) {
                        // Serialize the car object into a string, cz objects can't be sent directly
                        const carString = encodeURIComponent(
                            JSON.stringify(car)
                        );
                        return (
                            <Link
                                to={`/car_detail/${carString}/${categoryString}`}
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
