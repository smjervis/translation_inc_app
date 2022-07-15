import React from "react";

//The info corresponding to the article itself

const Article = ({ title, headline, link, categories }) => {

    return (
        <div className="card my-2">
            <h5 className="card-header">{title}</h5>
            <div className="card-body">
                <h5 className="card-title">{headline}</h5>
                <p className="card-text">{categories.map(({ description }) => description)}</p>
                <p className="card-text">Categoría: <span className="badge rounded-pill bg-success">{categories.map(({ name }) => name)}</span> </p>
                <a href={link} target="_blank" rel="noreferrer" className="btn btn-primary">Ver más</a>
            </div>
        </div>
    );
}

export default Article;