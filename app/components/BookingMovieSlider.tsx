import React, { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MovieBookingCard from "./MovieBookingCard";
import { MovieContext } from "../contexts/MovieContextProvider/MovieContextProvider";

function BookingMovieSlider() {
  const { movieState } = useContext(MovieContext);
  return (
    <div className="slider-container text-white">
      <Slider {...settings}>
        {movieState?.movies &&
          movieState.movies.map((movie, index) => (
            <MovieBookingCard key={movie._id} movie={movie} index={index} />
          ))}
      </Slider>
    </div>
  );
}

export default BookingMovieSlider;
const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "20px",
  slidesToShow: 8,
  speed: 500,
  responsive: [
    {
      breakpoint: 1024, // Tablet
      settings: {
        slidesToShow: 4,
        centerPadding: "10px",
      },
    },
    {
      breakpoint: 768, // Mobile (cỡ trung bình)
      settings: {
        slidesToShow: 5, // Hiển thị 3 item trên mobile
        centerPadding: "5px",
      },
    },
    {
      breakpoint: 480, // Mobile nhỏ
      settings: {
        slidesToShow: 3, // Giảm xuống còn 2 item nếu màn hình quá nhỏ
        centerPadding: "0px",
      },
    },
  ],
};
