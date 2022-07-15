import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import Spinner from "./Spinner"
import Article from "./Article"

//This is how the results are displayed.

const ResultsList = ({ results, resultsSize, loading, onPageClick }) => {

    const [pageCount, setPageCount] = useState(0);
    const itemsPerPage = 10

    //Calculates the total number of pages
    useEffect(() => {
        setPageCount(Math.ceil(resultsSize / itemsPerPage));
    }, [resultsSize]);

    return (
        <div>
            {results.length > 0 &&
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">>"
                    onPageChange={onPageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<<"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination justify-content-center my-3"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    activeClassName="active"
                    disabledClassName="disabled"
                />}
            {loading || results.length > 0 ?
                <div className="bg-success p-2 text-dark bg-opacity-25 my-5">
                    {resultsSize} Elementos encontrados
                </div>
                : ""
            }
            {loading ? <Spinner /> :
                <div>
                    {results.map(({ id, title, link, categories, headline }) => (
                        <div key={id} >
                            <Article title={title} link={link} headline={headline} categories={categories} />
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default ResultsList;

