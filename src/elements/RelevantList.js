import React from "react";

const RelevantList = ({onFilterRelevance}) => {

    return (
        <button type="button" className="btn btn-link mx-3" onClick={onFilterRelevance} >Resultados más relevantes</button>
    );
}

export default RelevantList;