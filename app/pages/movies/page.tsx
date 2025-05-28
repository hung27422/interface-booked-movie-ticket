"use client";
import Image from "next/image";
import PosterMovies from "@/app/assets/images/poster-image.jpg";
import useMovie from "@/app/hooks/useMovie";
import MovieBookingCard from "@/app/components/MovieBookingCard";
import { useState } from "react";

const menus = [
  {
    id: 1,
    label: "Đang chiếu",
    status: "NOWSHOWING",
    desc: "Danh sách các phim hiện đang chiếu rạp trên toàn quốc 26/05/2025. Xem lịch chiếu phim, giá vé tiện lợi, đặt vé nhanh chỉ với 1 bước!",
  },
  {
    id: 2,
    label: "Sắp chiếu",
    status: "COMINGSOON",
    desc: "Danh sách các phim dự kiến sẽ khởi chiếu tại các hệ thống rạp trên toàn quốc.",
  },
  {
    id: 3,
    label: "Chiếu sớm",
    status: "EARLYACCESS",
    desc: "Danh sách các phim hiện đang chiếu rạp trên toàn quốc. Xem lịch chiếu phim, giá vé tiện lợi, đặt vé nhanh chỉ với 1 bước!",
  },
  {
    id: 4,
    label: "Phim tháng này",
    status: "THISMONTH",
    desc: "Lịch phim dự kiến sẽ ra mắt tại các rạp trên toàn quốc vào tháng 05/2025 tại BICKIE.",
  },
];

export default function Movies() {
  const [dataMenu, setDataMenu] = useState(menus[0]);
  const { dataMoviesByStatus, dataMoviesByThisMonth } = useMovie({ status: dataMenu.status });
  const data = dataMenu.id === 4 ? dataMoviesByThisMonth : dataMoviesByStatus;

  return (
    <div className="mt-4 px-2 sm:px-4">
      {/* Header */}
      <div className="w-full h-auto sm:h-36 text-center border-white border-2 rounded-md relative">
        <Image
          src={PosterMovies}
          alt="poster-movies"
          className="w-full h-full object-cover rounded-md opacity-30"
        />
        <div className="w-full absolute top-4 sm:top-8 text-white px-4">
          <h2 className="font-bold text-lg sm:text-2xl">{dataMenu.label}</h2>
          <span className="text-sm sm:text-base">{dataMenu.desc}</span>
        </div>
      </div>

      {/* Content: Sidebar + Movie List */}
      <div className="mt-4 flex flex-col lg:flex-row gap-4">
        {/* Menu Sidebar */}
        <div className="w-full lg:w-1/4 border-2 border-white rounded-lg p-4">
          <div className="flex flex-col items-start gap-4">
            {menus.map((item) => (
              <div
                onClick={() => setDataMenu(item)}
                className={`w-full py-2 px-3 text-sm border rounded cursor-pointer ${
                  item.id === dataMenu.id
                    ? "bg-white text-black font-semibold"
                    : "text-white hover:bg-white/10"
                }`}
                key={item.id}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Movie List */}
        <div className="w-full lg:w-3/4 border-2 border-white p-4 rounded-lg">
          {data && data?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {data.map((item, index) => (
                <MovieBookingCard key={item._id} movie={item} index={index} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 text-white">
              Không có phim nào...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
