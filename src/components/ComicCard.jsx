import Card from "react-bootstrap/Card";
import "./ComicCard.css";
import { Link } from "react-router-dom";
import convertToVietnamTime from "../dateFormat/convertToVietnamTime";

const ComicCard = (props) => {
  let item, index;
  ({item: item, index: index} = props);

  // Chỉ hiển thị khi item và item.category tồn tại
  if (!item || !item.category) {
    return null;
  }

  const formattedDate = convertToVietnamTime(item.updatedAt); // Chuyển đổi thời gian sang giờ Việt Nam

  return (
    <Card key={index} className="h-100 comic-card">
      <Link to={`/details/${item.slug}`}>
        <Card.Img
            variant="top"
            src={`https://img.otruyenapi.com/uploads/comics/${item.thumb_url}`}
            alt={item.name}
        />
      </Link>
      <Card.Body>
        <Card.Title>
          <p className="comic-title">
            <Link className={"comic-card-title"} to={`/details/${item.slug}`}>{item.name}</Link>{" "}
            <span className={`badge text-bg-danger comic-status`}>{item.status}</span>
          </p>
        </Card.Title>
        {/* Hiển thị thể loại */}
        <div className="row d-flex justify-content-start p-0">
          {item.category && item.category.length > 0 ? (
            item.category.map((categoryItem) => (
              <div
                className="col-6 col-md-4 p-1"
                key={categoryItem.id || categoryItem.name}
              >
                <Link to={`/category/${categoryItem.slug}`} className="badge text-bg-secondary w-100 text-category">
                  {categoryItem.name}
                </Link>
              </div>
            ))
          ) : (
            <div className="badge">Others</div>
          )}
        </div>
        <Card.Text>
          <span className="fw-bold comic-chapter">
            Chapter:{" "}
            {(item?.chaptersLatest?.length > 0) ? item.chaptersLatest[0].chapter_name : "Truy cập sớm"}
          </span> <br />
          <span className={'font-monospace comic-date'}>Cập nhật: {formattedDate}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ComicCard;
