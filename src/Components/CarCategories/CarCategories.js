// car_rental_app_react_frontend\src\Components\CarCategories\CarCategories.js
import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import Search from "./Search";

const CarCategories = (props) => {
    return (
        <div
            className="container"
            style={{ display: "flex", flexDirection: "row" }}
        >
            <div style={{ flex: "70%" }}>
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
                        const categoryString = encodeURIComponent(
                            JSON.stringify(category)
                        );
                        return (
                            <Link
                                to={`/car_list/${categoryString}`}
                                key={index}
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
            <div style={{ flex: "30%" }}>
                <Search />
            </div>
        </div>
    );
};

export default CarCategories;
