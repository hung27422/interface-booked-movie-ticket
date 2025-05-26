import Image from "next/image";
import MovieDateSelector from "../MovieDateSelector";
import MovieShowTimes from "../MovieShowTimes";
import InfoIcon from "@mui/icons-material/Info";
import { useAppContext } from "@/app/contexts/AppContextProvider/AppContextProvider";
import useShowTime from "@/app/hooks/useShowTimes";

function MovieShowtimeDetails() {
  const { selectedDate, cinemaIDSelected } = useAppContext();

  const { filterByCinemaDateCinemaId } = useShowTime({
    idCinema: cinemaIDSelected === "" ? "67b7575dba9c7545a6904d31" : cinemaIDSelected,
    date: selectedDate,
  });
  console.log({ filterByCinemaDateCinemaId });

  return (
    <div className="">
      <div className="flex items-center justify-center bg-blue-950 text-pink-400 rounded-t-md h-10 mt-4 sm:mt-0">
        <InfoIcon />
        <h4 className="ml-3 text-sm md:text-xl"> Nhấn vào suất chiếu để tiến hành mua voucher </h4>
      </div>
      {/* Chọn ngày */}
      <div className=" justify-center text-center p-2  border-2 border-[#9400ff] mt-2 rounded-md hidden md:flex">
        <MovieDateSelector />
      </div>
      {filterByCinemaDateCinemaId ? (
        <>
          {/* Thông tin rạp */}
          <div className="flex flex-col justify-center text-center p-1 md:p-2  border-2 border-[#9400ff] mt-2 rounded-md">
            <h3 className="text-base md:text-lg">{filterByCinemaDateCinemaId?.cinema.name}</h3>
            <span className="text-xs">{filterByCinemaDateCinemaId?.cinema.location}</span>
          </div>
          {/* Danh sách suất chiếu */}
          <div className="flex p-2  border-2 border-[#9400ff] mt-2 rounded-md">
            {filterByCinemaDateCinemaId?.data?.map((item) => {
              return (
                <div key={item._id}>
                  {/* Thông tin suất phim */}
                  <div className="flex p-2 mt-2">
                    <div className="flex items-start justify-center mr-4 w-[20%] md:w-36 text-center ">
                      <Image
                        src={item.movie.poster}
                        alt="img-film"
                        width={80}
                        height={160}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col w-[80%]">
                      <h5 className="text-base">{item.movie.title}</h5>
                      <span className="opacity-80 text-sm">
                        {item.movie.ageRate}T · {item.movie.duration}&apos; ·{" "}
                        <a href="#">Trailer</a>
                      </span>
                      <span className="mt-2 text-sm">Phụ đề: {item.movie.caption}</span>
                      <div className="mt-3">
                        <MovieShowTimes data={item.showtimes} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center text-center p-1 md:p-2  border-2 border-[#9400ff] mt-2 rounded-md">
          Rạp hiện tại chưa có suất chiếu nào...
        </div>
      )}
    </div>
  );
}

export default MovieShowtimeDetails;
