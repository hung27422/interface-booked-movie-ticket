"use client";
import MovieShowtimeDetails from "@/app/components/Home/MovieShowtimeDetails";
import LoaderSpinner from "@/app/components/LoaderSpinner";
import useCinemas from "@/app/hooks/useCinemas";
import Image from "next/image";

interface DetailCinemaProps {
  params: { idCinema: string };
}
function DetailCinema({ params }: DetailCinemaProps) {
  const { getCinemaByID } = useCinemas({ idCinema: params.idCinema });
  if (!getCinemaByID) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderSpinner />
      </div>
    );
  }
  return (
    <div>
      <div className="flex gap-4 bg-gray-800 mt-4 p-2 rounded-lg">
        <Image src={getCinemaByID?.image} alt="img-cinema" width={70} height={70} />
        <div className="flex flex-col">
          <span className="text-lg font-bold">{getCinemaByID.name}</span>
          <span className="opacity-75">{getCinemaByID.location}</span>
          <span className="opacity-75">{getCinemaByID.cinemaCode}</span>
        </div>
      </div>
      <div className="mt-4">
        <MovieShowtimeDetails idCinema={params.idCinema} />
      </div>
    </div>
  );
}

export default DetailCinema;
