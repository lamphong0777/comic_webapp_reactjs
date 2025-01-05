import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import ComicCard from "./ComicCard";
import { Pagination } from "react-bootstrap";
import { Loading } from ".";
import { useSearchParams } from "react-router-dom";

const Search = () => {
    const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [getdata, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://otruyenapi.com/v1/api/tim-kiem?keyword=${query}&page=${currentPage}`
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
  }, [currentPage, query]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // Phân trang
  const totalItems = getdata?.data.params?.pagination?.totalItems || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <Helmet>
        <title>{getdata.data.seoOnPage.titleHead}</title>
      </Helmet>
      <h1>Tìm kiếm truyện: {query}</h1>
      <div className="row d-flex justify-content-center">
        {getdata.data.items && getdata.data.items.length > 0 ? (
          getdata.data.items.map((item, index) => (
            <div className="col-md-3 col-6 p-2" key={index}>
              <ComicCard item={item} index={item._id} />
            </div>
          ))
        ) : (
          <p>No content available</p>
        )}
      </div>
      <Pagination className="d-flex justify-content-center">
        <Pagination.First onClick={() => paginate(1)} />
        <Pagination.Prev
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;

          const rangeStart = Math.floor((currentPage - 1) / 5) * 5 + 1;
          const rangeEnd = Math.min(rangeStart + 4, totalPages);

          if (pageNumber >= rangeStart && pageNumber <= rangeEnd) {
            return (
              <Pagination.Item
                key={pageNumber}
                active={pageNumber === currentPage}
                onClick={() => paginate(pageNumber)}
              >
                {pageNumber}
              </Pagination.Item>
            );
          }
        })}
        <Pagination.Next
          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last onClick={() => paginate(totalPages)} />
      </Pagination>
    </div>
  );
};

export default Search;
