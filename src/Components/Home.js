// car_rental_app_react_frontend\src\Components\Home.js
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AddCar from "./AddCar/AddCar";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { getCategories } from "../redux/actionCreators";

const mapStateToProps = (state) => {
    return {
        account_type: state.account_type,
        user_email: state.user_email,
        categories: state.categories,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => dispatch(getCategories()),
    };
};

const Home = (props) => {
    // Modal
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        props.getCategories();
    }, []);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <div>
            <p>{props.categories}</p>
            <Modal isOpen={modalOpen}>
                <ModalBody>
                    <AddCar
                        user_email={props.user_email}
                        categories={props.categories}
                    />
                </ModalBody>

                {/* close button */}
                <ModalFooter>
                    <button className="btn btn-primary" onClick={toggleModal}>
                        Close
                    </button>
                </ModalFooter>
            </Modal>

            {props.account_type === "Owner" && (
                <button
                    className="addNewButton"
                    active
                    color="info"
                    onClick={toggleModal}
                >
                    Add New Car
                </button>
            )}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
