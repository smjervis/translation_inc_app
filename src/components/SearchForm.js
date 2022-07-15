import React, { useState, useEffect } from "react"
import axios from "axios"
import ResultsList from './ResultsList';
import RelevantList from '../elements/RelevantList';
import Alert from "../elements/Alert"

const SearchForm = () => {

    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])
    const [resultsSize, setResultSize] = useState(0)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const [relevanceOrder, setRelevanceOrder] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    //Validates first if there is already a result, so for any change on dependedencies, it restrieves data. If not, it won't do anything.
    useEffect(() => {
        if (resultsSize) {
            retrieveData()
        }
    }, [currentPage, resultsSize, relevanceOrder])

    const retrieveData = async () => {
        setLoading(true)
        const response = await axios.get("https://beta.mejorconsalud.com/wp-json/mc/v3/posts", {
            params: {
                search: search,
                page: currentPage,
                ...(relevanceOrder) && { orderby: "relevance" },
            }
        }).catch((error) => {
            console.log(error);
        })
        setResults(response.data.data)
        setResultSize(response.data.size)
        setLoading(false)
        console.log(response.data);

        if (response.data.data.length === 0) {
            setShowAlert(true)
            setAlert("¡No hay artículos relacionados con el término de búsqueda!")
        }
    }

    //Sets the search term value.
    const onSearchChange = (e) => {
        setSearch(e.target.value)
    }

    //Sets the page numer to retrieve its data.
    const onPageClick = (pageNumber) => {
        setCurrentPage(pageNumber.selected + 1)
    };

    const onSearchSubmit = async (e) => {
        e.preventDefault()
        if (search === "") {
            setShowAlert(true)
            setAlert("Ingrese un término de búsqueda")
            setTimeout(() => {
                setShowAlert(false)
            }, 3000);
        } else {
            setRelevanceOrder(false)
            setResults("")
            retrieveData()
            setShowAlert(false)
            setResultSize(0)
        }
    }

    //Sets if relevant results are shown.
    const onFilterRelevance = async () => {
        setRelevanceOrder(true)
    }

    return (
        <>
            <form onSubmit={onSearchSubmit}>
                <div className="mb-3">
                    <h3 className="text-center mb-5">Buscar artículos</h3>
                    <input value={search} onChange={onSearchChange} type="text" className="form-control mb-3" />
                </div>
                <button type="submit" className="btn btn-primary">Buscar</button>
                <Alert alert={alert} showAlert={showAlert} setShowAlert={setShowAlert} />
                {!loading && results.length > 0 && <RelevantList onFilterRelevance={onFilterRelevance} />}
            </form>
            <ResultsList results={results} resultsSize={resultsSize} loading={loading} onPageClick={onPageClick} />
        </>
    );
}

export default SearchForm;

