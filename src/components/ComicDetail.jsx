import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import convertToVietnamTime from "../dateFormat/convertToVietnamTime";
import "./ComicDetail.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const ComicDetail = () => {
  const { slug } = useParams();
  const [getData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [chapterRead, setChapterRead] = useState("");
  const [openChapter, setOpenChapter] = useState(false);
  const [dataChapter, setDataChapter] = useState(false);
  const chapter_length = getData?.data?.item?.chapters[0]?.server_data?.length;

  // Số chương hiển thị ban đầu
  const initialChaptersToShow = 3;

  // State để theo dõi số chương đang hiển thị
  const [chaptersToShow, setChaptersToShow] = useState(initialChaptersToShow);

  // Hàm để xử lý sự kiện khi người dùng bấm 'Xem thêm'
  const handleShowMore = (chapter_index) => {
    setChaptersToShow(chapter_index);
  };

  const handleClose = () => setOpenChapter(false);
  const handleOpenComic = async (chapterApi, chapter) => {
    setLoading(true);
    try {
      const response = await axios.get(`${chapterApi}`);
      setDataChapter(response.data);
      setLoading(false);
      // console.log(response.data);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    setOpenChapter(true);
    setChapterRead(chapter);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://otruyenapi.com/v1/api/truyen-tranh/${slug}`
        );
        setData(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return <div className="fs-1 text-center mt-5">Loading.......</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="container mt-3">
      <Helmet>
        <title>{getData.data.seoOnPage.titleHead}</title>
      </Helmet>
      <div className="row m-0">
        <div className="col-12 col-md-3">
          <img
            className="w-100 h-auto rounded"
            src={`https://img.otruyenapi.com/uploads/comics/${getData.data.item.thumb_url}`}
            alt={getData.data.item.name}
          />
        </div>
        <div className="col-12 col-md-9">
          <h1 className="text-uppercase text-center">{getData.data.item.name}</h1>
          <p className="fst-italic">
            Cập nhật lúc: {convertToVietnamTime(getData.data.item.updatedAt)}
          </p>
          <div className="row">
            <div className="col-md-2 col-5">Tác giả:</div>
            <div className="col-md-10 col-7">
              {getData?.data?.item?.author[0] !== ""
                ? getData.data.item.author[0]
                : "Đang cập nhật"}
            </div>
            <div className="col-md-2 col-5">Tình trạng:</div>
            <div className="col-md-10 col-7">{getData.data.item.status}</div>
            <div className="col-md-2 col-5">Thể loại:</div>
            <div className="col-md-10 col-7 text-primary fw-bold">
              {getData.data.item.category &&
              getData.data.item.category.length > 0
                ? getData.data.item.category.map((item, index) => (
                    <Link className="text-category" to={`/category/${item.slug}`} key={item.id || index}>
                      {item.name}
                      {index < getData.data.item.category.length - 1 && " - "}
                    </Link>
                  ))
                : "Others"}
            </div>
            <div className="row m-0 mt-2">
              <div className="col-md-4 me-3 mb-2 col-5">
                <button className="btn-read"
                onClick={() => handleOpenComic(getData.data.item.chapters[0].server_data[0].chapter_api_data, getData.data.item.chapters[0].server_data[0].chapter_name)}
                >Đọc từ đầu</button>
              </div>
              <div className="col-md-4 p-0 col-6">
                <button className="btn-read"
                onClick={() => handleOpenComic(getData.data.item.chapters[0].server_data[chapter_length-1].chapter_api_data, getData.data.item.chapters[0].server_data[chapter_length-1].chapter_name)}
                >Đọc mới nhất</button>
              </div>
            </div>
            <div className="row m-0">
              <span className="text-primary">[Giới thiệu]</span>
              <br />
              <p
                dangerouslySetInnerHTML={{ __html: getData.data.item.content }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row m-0">
        <h3 className={'ms-2 ms-md-3 p-3 col-12 comic-page-title'}>Danh sách chương</h3>
        {getData?.data?.item?.chapters?.length > 0
          ? getData.data.item.chapters.map((element, index) => (
              <div key={index}>
                {element.server_data.length > 0
                  ? element.server_data
                      .slice(0, chaptersToShow) // Chỉ hiển thị số chương theo `chaptersToShow`
                      .map((item, index) => (
                        <div
                          key={index}
                          className="p-2 chapter"
                          role="alert"
                          onClick={() => handleOpenComic(item.chapter_api_data, item.chapter_name)}
                        >
                          Chương: {item.chapter_name}
                        </div>
                      ))
                  : "Truyện đang cập nhật...."}

                {/* Hiển thị nút 'Xem thêm' nếu có chương chưa được hiển thị */}
                <div className={'d-flex justify-content-center'}>
                  {chaptersToShow < element.server_data.length && (
                    <button
                      onClick={() => handleShowMore(element.server_data.length)} // Truyền hàm callback với số lượng chương
                      className="btn btn-load-more"
                    >
                      Xem thêm....
                    </button>
                  )}
                </div>
                <div className={'d-flex justify-content-center'}>
                  {chaptersToShow === element?.server_data?.length && (
                    <button
                      onClick={() => handleShowMore(3)} // Truyền hàm callback với số lượng chương
                      className="btn btn-hide"
                    >
                      Ẩn bớt...
                    </button>
                  )}
                </div>
              </div>
            ))
          : "Truyện đang cập nhật...."}
      </div>
      <Modal show={openChapter} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Chapter: { chapterRead }</Modal.Title>
        </Modal.Header>
        <Modal.Body className={'bg-dark'}>
          {openChapter &&
            (dataChapter.data.item.chapter_image &&
            dataChapter.data.item.chapter_image.length > 0 ? (
              dataChapter.data.item.chapter_image.map((item, index) => (
                <div key={index}>
                  <img className="w-100 h-100" src={`${dataChapter.data.domain_cdn}/${dataChapter.data.item.chapter_path}/${item.image_file}`} alt={`${item.image_file}`} />
                </div> // Replace "ABC" with your actual component or content to render.
              ))
            ) : (
              <div>NULL</div>
            )) // Display "NULL" when no images are found.
          }
        </Modal.Body>

        <Modal.Footer>
          <Modal.Title>Chapter: { chapterRead }</Modal.Title>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
