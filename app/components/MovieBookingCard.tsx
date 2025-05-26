import Image from "next/image";
import { IMovie } from "../types/Movie";

interface MovieBookingCardProps {
  movie: IMovie;
  index: number;
}

function MovieBookingCard({ movie, index }: MovieBookingCardProps) {
  const { title, poster } = movie;

  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[180px] p-2 mx-auto cursor-pointer tech-border rounded-md">
      <Image
        src={poster}
        alt="img-film"
        className="rounded-md object-cover w-24 h-32 sm:w-28 sm:h-36 md:w-32 md:h-40"
        width={128}
        height={160}
      />
      <div className="w-full text-center mt-2 px-1">
        <h5 className="truncate text-xs sm:text-sm md:text-base font-medium">{title}</h5>
      </div>
      <div className="text-xs sm:text-sm text-gray-300 mt-1">#{index + 1}</div>
    </div>
  );
}

export default MovieBookingCard;
