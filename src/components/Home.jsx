import axios from "axios";
import {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import ComicCard from "./ComicCard";
import {Pagination} from "react-bootstrap";
import {Loading} from ".";
import {Carousel} from "../components";
import { useNavigate } from 'react-router-dom';


let Home = () => {
    const [getData, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const itemsPerPage = 24;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://otruyenapi.com/v1/api/danh-sach/truyen-moi?page=${currentPage}`
                );
                setData(response.data);
                setLoading(false);
                // console.log(response.data);
            } catch (error) {
                setError(error.message);
                setLoading(false);
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [currentPage]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        navigate(`?page=${pageNumber}`);
    }
    // Phân trang
    const totalItems = getData?.data.params?.pagination?.totalItems || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (loading) {
        return <Loading/>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Carousel/>
            <div className="container home-container p-3">
                <Helmet>
                    <title>{getData.data.seoOnPage.titleHead}</title>
                </Helmet>
                <h4 className={'comic-page-title'}>{getData.data.titlePage}</h4>
                <div className="row d-flex justify-content-center m-0">
                    {getData.data.items && getData.data.items.length > 0 ? (
                        getData.data.items.map((item, index) => (
                            <div className="col-6 col-md-3 p-2" key={index}>
                                <ComicCard item={item} index={item._id}/>
                            </div>
                        ))
                    ) : (
                        <p>No content available</p>
                    )}
                </div>
                <Pagination className="d-flex justify-content-center home-paginate">
                    <Pagination.First onClick={() => paginate(1)}/>
                    <Pagination.Prev
                        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    />
                    {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;

                        const rangeStart = Math.floor((currentPage - 1) / 5) * 5 + 1;
                        const rangeEnd = Math.min(rangeStart + 4, totalPages);

                        if (pageNumber >= rangeStart && pageNumber <= rangeEnd) {
                            return (<Pagination.Item key={pageNumber} active={pageNumber === currentPage}
                                                     onClick={() => paginate(pageNumber)}
                            >
                                {pageNumber}
                            </Pagination.Item>)
                        }
                    })

                    }
                    <Pagination.Next
                        onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    />
                    <Pagination.Last onClick={() => paginate(totalPages)}/>
                </Pagination>
            </div>
        </>
    );
};

export default Home;
