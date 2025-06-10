"use client";
import AutocompleteAddress from "@/app/components/Cinemas/AutocompleteAddress";
import useDebounce from "@/app/components/Hooks/useDebounce";
import LoaderSpinner from "@/app/components/LoaderSpinner";
import SectionTitle from "@/app/components/SectionTitle";
import TextFieldInput from "@/app/components/TextFieldInput";
import { useAppContext } from "@/app/contexts/AppContextProvider/AppContextProvider";
import useCinemas from "@/app/hooks/useCinemas";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";

function Cinemas() {
  //state
  const [valueSearch, setValueSearch] = useState<string>("");
  const debouncedValue = useDebounce(valueSearch, 300);
  // context
  const { selectedAutoCompletedAddress } = useAppContext();
  //custom hook
  const {
    dataCinemaByLocation,
    dataCinemaByName,
    isLoadingCinemaByLocation,
    isLoadingCinemaByName,
  } = useCinemas({
    location: selectedAutoCompletedAddress,
    name: debouncedValue ?? "",
  });
  // function
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(e.target.value);
  }, []);

  return (
    <div className="mt-4">
      <div>
        <SectionTitle title="RẠP PHIM" />
      </div>

      <div className="w-[70%] mx-auto rounded-md py-4">
        <div className="flex flex-col sm:flex-row items-center justify-center py-2 px-4 rounded-lg gap-2">
          <div className="w-full">
            <TextFieldInput
              onChange={handleSearchChange}
              name="search"
              label="Tìm kiếm rạp..."
              size="small"
            />
          </div>
          <div className="w-full mt-1 sm:mt-0">
            <AutocompleteAddress />
          </div>
        </div>
        {dataCinemaByName ? (
          <div>
            {dataCinemaByName ? (
              dataCinemaByName.map((item, idx) => {
                if (!item._id) return null;
                return (
                  <Link
                    href={`/pages/cinemas/${item._id}`}
                    key={item._id ?? idx}
                    className="flex items-center gap-4 bg-gray-800 py-2 px-2 rounded-md cursor-pointer mb-2 h-16"
                  >
                    <Image
                      src={item.image}
                      alt="img-cinema"
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                    <div className="flex flex-col ">
                      <span className="text-base">{item.name}</span>
                      <span className="text-sm opacity-60">{item.location}</span>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div>
                {isLoadingCinemaByName ? (
                  <div className="flex items-center justify-center">
                    <LoaderSpinner />
                  </div>
                ) : (
                  "Không tìm thấy rạp nào..."
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="mt-2 sm:mt-0">
            {dataCinemaByLocation && dataCinemaByLocation.length > 0 ? (
              <>
                {dataCinemaByLocation?.map((item) =>
                  item.cinemas.map((data) =>
                    data.items.map((cinema, index) => {
                      return (
                        <Link
                          href={`/pages/cinemas/${cinema._id}`}
                          key={index}
                          className="flex items-center gap-4 bg-gray-800 py-2 px-2 rounded-md cursor-pointer mb-2 h-16"
                        >
                          <Image
                            src={cinema.image}
                            alt="img-cinema"
                            width={50}
                            height={50}
                            className="rounded-md"
                          />
                          <div className="flex flex-col ">
                            <span className="text-base">{cinema.name}</span>
                            <span className="text-sm opacity-60">{cinema.location}</span>
                          </div>
                        </Link>
                      );
                    })
                  )
                )}
              </>
            ) : (
              <div className="flex items-center justify-center mt-5">
                {isLoadingCinemaByLocation ? (
                  <div className="flex items-center justify-center">
                    <LoaderSpinner />
                  </div>
                ) : (
                  "Chưa có rạp nào ở địa chỉ này..."
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cinemas;
