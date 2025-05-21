import Image from "next/image";
import SearchCinemasInput from "../SearchCinemasInput";
import { useAppContext } from "@/app/contexts/AppContextProvider/AppContextProvider";
import useCinemas from "@/app/hooks/useCinemas";

function CinemaSelector() {
  //states
  const { selectedAddress, cinemaIDSelected, setCinemaIDSelected } = useAppContext();
  // hooks
  const { dataCinemaByLocation } = useCinemas({ location: selectedAddress ?? "" });
  // function
  const handleSelectedCinema = (cinemaId: string) => {
    setCinemaIDSelected(cinemaId);
  };

  // Tìm tên của rạp đã chọn
  if (!dataCinemaByLocation) return <div>Loading...</div>;

  return (
    <>
      {/* Hiển thị trên desktop */}
      {dataCinemaByLocation.map((item, index) => {
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
                    <ul className="border border-purple-500 mt-2 rounded-md bg-blue-950 text-white transition-all">
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
