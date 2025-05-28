"use client";
import AutocompleteAddress from "@/app/components/Cinemas/AutocompleteAddress";
import SectionTitle from "@/app/components/SectionTitle";
import TextFieldInput from "@/app/components/TextFieldInput";
import { useAppContext } from "@/app/contexts/AppContextProvider/AppContextProvider";
import useCinemas from "@/app/hooks/useCinemas";
import Image from "next/image";
import Link from "next/link";

function Cinemas() {
  // context
  const { selectedAutoCompletedAddress } = useAppContext();
  //custom hook
  const { dataCinemaByLocation } = useCinemas({ location: selectedAutoCompletedAddress });

  return (
    <div className="mt-4">
      <div>
        <SectionTitle title="RẠP PHIM" />
      </div>

      <div className="w-[70%] mx-auto rounded-md py-4">
        <div className="flex items-center justify-center py-2 px-4 rounded-lg">
          <div className="w-full">
            <TextFieldInput name="search" label="Tìm kiếm rạp..." size="small" />
          </div>
          <div className="w-full">
            <AutocompleteAddress />
          </div>
        </div>
        <div>
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
              Chưa có rạp nào ở địa chỉ này...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cinemas;
