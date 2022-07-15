import React from "react";

const Alert = ({ alert, showAlert, setShowAlert }) => {

    return (
        <>
            {showAlert && <p className="alert alert-danger my-3 text-center">{alert}</p>}
        </>
    );
}

export default Alert;