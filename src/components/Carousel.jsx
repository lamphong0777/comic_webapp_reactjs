import  { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import {slider1, slider2, slider3} from "../assets";

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle changing the active slide
  const handleSelect = (index) => {
    setActiveIndex(index);
  };

  return (
    <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
      {/* Carousel Indicators */}
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="0"
          className={activeIndex === 0 ? 'active' : ''}
          aria-current={activeIndex === 0 ? 'true' : 'false'}
          aria-label="Slide 1"
          onClick={() => handleSelect(0)}
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="1"
          className={activeIndex === 1 ? 'active' : ''}
          aria-label="Slide 2"
          onClick={() => handleSelect(1)}
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide-to="2"
          className={activeIndex === 2 ? 'active' : ''}
          aria-label="Slide 3"
          onClick={() => handleSelect(2)}
        ></button>
      </div>

      {/* Carousel Inner */}
      <div className="carousel-inner">
        <div className={`carousel-item ${activeIndex === 0 ? 'active' : ''}`} data-bs-interval="10000">
          <img src={slider1} className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>
                <button className={'btn btn-outline-info'}>Read now</button></h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
        <div className={`carousel-item ${activeIndex === 1 ? 'active' : ''}`} data-bs-interval="2000">
          <img src={slider2} className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div>
        </div>
        <div className={`carousel-item ${activeIndex === 2 ? 'active' : ''}`}>
          <img src={slider3} className="d-block w-100" alt="..." />
          <div className="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="prev"
        onClick={() => handleSelect((activeIndex - 1 + 3) % 3)}
      >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide="next"
        onClick={() => handleSelect((activeIndex + 1) % 3)}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
