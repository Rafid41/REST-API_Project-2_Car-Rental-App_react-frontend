// car_rental_app_react_frontend\src\Components\CarCategories\CarCategories.js
import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const CarCategories = (props) => {
    return (
        <div className="container">
            <h2
                style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    marginBottom: "15px",
                }}
            >
                Car Categories
            </h2>
            <ListGroup>
                {props.categories.map((category, index) => {
                    // <p>{category.category_name}</p>
                    // convert object to string so that it can be passed by Link
                    const categoryString = encodeURIComponent(
                        JSON.stringify(category)
                    );
                    return (
                        <Link
                            to={`/car_list/${categoryString}`}
                            key={index} //optional
                            style={{ textDecoration: "None" }}
                        >
                            <ListGroupItem key={index} action>
                                <p
                                    style={{
                                        fontSize: "20px",
                                        padding: "5px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {category.category_name}
                                </p>
                            </ListGroupItem>
                        </Link>
                    );
                })}
            </ListGroup>
        </div>
    );
};

export default CarCategories;
