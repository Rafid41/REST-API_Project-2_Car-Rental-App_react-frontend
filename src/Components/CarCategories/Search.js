import React, { useState } from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        cars: state.cars,
        categories: state.categories,
    };
};

const Search = (props) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to perform the search
    const performSearch = () => {
        if (searchQuery.length > 0) {
            const filteredCars = props.cars.filter((car) =>
                car.car_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(filteredCars);
        } else {
            setSearchResults([]);
        }
    };

    return (
        <div style={{ marginLeft: "2rem" }}>
            <center>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleInputChange}
                        placeholder="Search with Car Name..."
                        className="form-control"
                    />

                    <button className="btn btn-success" onClick={performSearch}>
                        Search
                    </button>
                </div>

                {/* Display search results */}
                <ListGroup>
                    {searchResults.length > 0 && // Check if searchResults is not empty
                        searchResults.map((car, index) => {
                            const category = props.categories.find(
                                (category) => category.id === car.car_category
                            );
                            if (category) {
                                const carString = encodeURIComponent(
                                    JSON.stringify(car)
                                );
                                const categoryString = encodeURIComponent(
                                    JSON.stringify(category)
                                );

                                return (
                                    <Link
                                        to={`/car_detail/${carString}/${categoryString}`}
                                        key={index}
                                        style={{ textDecoration: "None" }}
                                    >
                                        <ListGroupItem key={index} action>
                                            <p style={{ fontWeight: "bold" }}>
                                                {car.car_name}
                                            </p>
                                        </ListGroupItem>
                                    </Link>
                                );
                            } else {
                                return null;
                            }
                        })}
                </ListGroup>
            </center>
            <br />
            <br />
        </div>
    );
};

export default connect(mapStateToProps)(Search);
