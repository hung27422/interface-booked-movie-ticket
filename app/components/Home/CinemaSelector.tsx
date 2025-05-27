import Image from "next/image";
import SearchCinemasInput from "../SearchCinemasInput";
import { useAppContext } from "@/app/contexts/AppContextProvider/AppContextProvider";
import useCinemas from "@/app/hooks/useCinemas";
import useShowTime from "@/app/hooks/useShowTimes";
import { useEffect } from "react";

interface CinemaSelectorProps {
  idMovie?: string;
}
function CinemaSelector({ idMovie }: CinemaSelectorProps) {
  //states
  const { selectedAddress, cinemaIDSelected, setCinemaIDSelected } = useAppContext();

  // hooks
  const { dataCinemaByLocation } = useCinemas({
    location: selectedAddress ?? "",
  });
  const { getCinemasByMovieId } = useShowTime({
    idMovie: idMovie,
    location: selectedAddress ?? "",
  });

  // function
  const handleSelectedCinema = (cinemaId: string) => {
    setCinemaIDSelected(cinemaId);
  };

  // Tìm tên của rạp đã chọn
  useEffect(() => {
    if (getCinemasByMovieId && getCinemasByMovieId.length > 0) {
      const idCinemaSelected = getCinemasByMovieId[0]?.cinemas[0]?.items[0]?._id;
      if (idCinemaSelected) {
        setCinemaIDSelected(idCinemaSelected);
      }
    }
  }, [getCinemasByMovieId, setCinemaIDSelected]);

  const data = getCinemasByMovieId ? getCinemasByMovieId : dataCinemaByLocation;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      {/* Hiển thị trên desktop */}
      {data.map((item, index) => {
        return (
          <div key={index}>
            {item.cinemas.map((cinema, index) => {
              return (
                <div key={index}>
                  <div className="mb-2 hidden lg:block">
                    <div className="flex items-center justify-center bg-blue-950 text-pink-400 rounded-t-md h-10">
                      <Image
                        src={cinema.image}
                        alt="img-logo-cinemas"
                        className="rounded-md"
                        width={25}
                        height={25}
                      ></Image>
                      <h3 className="ml-3 text-xl">{cinema.cinemaCode}</h3>
                    </div>
                    <ul className="border border-purple-500 mt-2 rounded-md  text-white transition-all">
                      {cinema?.items?.map((cinemaItem) => {
                        return (
                          <li
                            key={cinemaItem._id}
                            className={`py-2 px-8 border-b border-purple-500 text-base cursor-pointer text-center transition-colors duration-200 ${
                              cinemaIDSelected === cinemaItem._id
                                ? "bg-blue-900 text-pink-400"
                                : "hover:bg-blue-900 hover:text-pink-400"
                            }`}
                            onClick={() => handleSelectedCinema(cinemaItem._id)}
                          >
                            {cinemaItem.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      <div className="mt-2 text-center lg:hidden">
        <SearchCinemasInput />
      </div>
    </>
  );
}

export default CinemaSelector;
