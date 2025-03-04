import Image from "next/image";
import MovieDateSelector from "../MovieDateSelector";
import MovieShowTimes from "../MovieShowTimes";
import InfoIcon from "@mui/icons-material/Info";

function MovieShowtimeDetails() {
  return (
    <>
      <div className="flex items-center justify-center bg-blue-950 text-pink-400 rounded-t-md h-10">
        <InfoIcon />
        <h4 className="ml-3 text-sm"> Nhấn vào suất chiếu để tiến hành mua voucher </h4>
      </div>
      {/* Chọn ngày */}
      <div className=" justify-center text-center p-2  border-2 border-[#9400ff] mt-2 rounded-md hidden md:flex">
        <MovieDateSelector />
      </div>
      {/* Thông tin rạp */}
      <div className="flex flex-col justify-center text-center p-2  border-2 border-[#9400ff] mt-2 rounded-md">
        <h3 className="text-lg">Lotte Nam Cộng Hòa</h3>
        <span className="text-xs">
          Tầng 3, Lotte Mart, 469 Nguyễn Hữu Thọ, P. Tân Hưng, Q.7, Tp. Hồ Chí Minh
        </span>
      </div>
      {/* Thông tin suất phim */}
      <div className="flex p-2  border-2 border-[#9400ff] mt-2 rounded-md">
        <div className="flex items-start justify-center mr-4 w-[20%] md:w-36 text-center ">
          <Image
            src={"https://cdn.moveek.com/storage/media/cache/mini/6773a926b7b26025677256.jpg"}
            alt="img-film"
            width={80}
            height={160}
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col w-[80%]">
          <h5 className="">Nhà Gia Tiên</h5>
          <span className="opacity-80 text-sm">
            The Ancestral Home · T18 · 1h57&apos; · <a href="#">Trailer</a>
          </span>
          <span className="mt-2">2D Phụ Đề Tiếng Anh</span>
          <div className="mt-3">
            <MovieShowTimes />
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieShowtimeDetails;
