"use client";

import BookingMovieSlider from "./components/BookingMovieSlider";
import SectionTitle from "./components/SectionTitle";
import LocationSelector from "./components/Home/LocationSelector";
import CinemaSelector from "./components/Home/CinemaSelector";
import MovieShowtimeDetails from "./components/Home/MovieShowtimeDetails";
export default function Home() {
  return (
    <main className="mt-4 h-full">
      {/* Book movie tickets according to movies: Đặt vé xem phim theo phim */}
      <div className="text-center ">
        <SectionTitle title="Mua Vé Theo Phim" />
        <div className="mt-4">
          <BookingMovieSlider numberSlidesToShow={8} />
        </div>
      </div>

      {/* Divider: Đường gạch ngang */}
      <div className="border-b-2 border-purple-500 border-dashed my-2 mt-10 glow-effect"></div>

      {/* Book movie tickets according to cinemas: Đặt vé xem phim theo rạp */}
      <div className="mt-4">
        <SectionTitle title="Mua Vé Theo Rạp" />

        <div className="flex flex-col justify-center gap-2 mt-3 lg:grid lg:grid-cols-12">
          {/* Khu vực */}
          <div className="lg:col-span-3">
            <LocationSelector />
          </div>
          {/* Thông tin rạp */}
          <div className="lg:col-span-3">
            <CinemaSelector />
          </div>
          {/* Suất chiếu */}
          <div className="lg:col-span-6">
            <MovieShowtimeDetails />
          </div>
        </div>
      </div>
    </main>
  );
}
