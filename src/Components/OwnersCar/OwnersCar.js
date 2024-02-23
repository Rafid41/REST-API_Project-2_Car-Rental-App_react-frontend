import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const OwnersCar = (props) => {
    const userId = localStorage.getItem("userId");
    return (
        <div>
            <h2
                style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    marginBottom: "15px",
                }}
            >
                Your Car(s)
            </h2>
            <ListGroup>
                {props.cars.map((car, index) => {
                    if (userId == car.owner) {
                        // Serialize the car object into a string, cz objects can't be sent directly
                        const carString = encodeURIComponent(
                            JSON.stringify(car)
                        );

                        // Find the category matching the car
                        const matchingCategory = props.categories.find(
                            (category) => car.car_category === category.id
                        );

                        if (matchingCategory) {
                            const categoryString = encodeURIComponent(
                                JSON.stringify(matchingCategory)
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
                    }
                    return null;
                })}
            </ListGroup>
            <br />
        </div>
    );
};

export default OwnersCar;
