import React, { useState, useEffect } from "react";
import { Alert } from "reactstrap";

function AlertMessage(props) {
    const [visible, setVisible] = useState(false); // Set initial state to false

    const onDismiss = () => setVisible(false);

    useEffect(() => {
        if (props.message) {
            setVisible(true); // Set visible to true only if a message is present
        }
    }, [props.message]); // Trigger effect when props.message changes

    return (
        <Alert color={props.color} isOpen={visible} toggle={onDismiss}>
            {props.message}
        </Alert>
    );
}

export default AlertMessage;
