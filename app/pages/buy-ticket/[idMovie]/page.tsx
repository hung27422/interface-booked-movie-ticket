"use client";
import CinemaSelector from "@/app/components/Home/CinemaSelector";
import LocationSelector from "@/app/components/Home/LocationSelector";
import MovieShowtimeDetails from "@/app/components/Home/MovieShowtimeDetails";
import SectionTitle from "@/app/components/SectionTitle";
import useMovie from "@/app/hooks/useMovie";
import Image from "next/image";

interface BuyTicketProps {
  params: { idMovie: string };
}
function BuyTicket({ params }: BuyTicketProps) {
  const { dataMovieById } = useMovie({ idMovie: params.idMovie });
  if (!dataMovieById) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mt-4">
      <div className="w-full h-auto sm:h-36 text-center border-white border-2 rounded-md relative">
        <Image
          src={dataMovieById.poster}
          width={500}
          height={100}
          alt="poster-movies"
          className="w-full h-full object-cover rounded-md opacity-30"
        />
        <div className="flex flex-col w-full absolute top-4 text-white px-4">
          <p className="font-bold text-lg sm:text-4xl">{dataMovieById.title}</p>
          <span className="text-sm text-gray-300 mt-2">Đạo diễn: {dataMovieById.director}</span>
          <div className="flex items-center justify-center gap-2 mt-2 text-gray-300">
            <span className="text-sm">Thời gian: {dataMovieById.duration}</span>
            <span className="text-sm">Độ tuổi: {dataMovieById.ageRate}T</span>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <SectionTitle title="Mua Vé Trực Tuyến" />
      </div>
      <div className="mt-4">
        <div className="flex flex-col justify-center gap-2 mt-3 lg:grid lg:grid-cols-12">
          {/* Khu vực */}
          <div className="lg:col-span-3">
            <LocationSelector />
          </div>
          {/* Thông tin rạp */}
          <div className="lg:col-span-3">
            <CinemaSelector idMovie={params.idMovie} />
          </div>
          {/* Suất chiếu */}
          <div className="lg:col-span-6">
            <MovieShowtimeDetails />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyTicket;
