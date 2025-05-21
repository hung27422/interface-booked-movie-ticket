import Image from "next/image";
import { IMovie } from "../types/Movie";

interface MovieBookingCardProps {
  movie: IMovie;
  index: number;
}
function MovieBookingCard({ movie, index }: MovieBookingCardProps) {
  const { title, poster } = movie;
  return (
    <div className="flex flex-col justify-center items-center max-md:w-20 p-2 m-2 md:mx-2 mx-auto cursor-pointer tech-border">
      <Image
        src={poster}
        alt="img-film"
        className="w-20 h-24 md:w-32 md:h-40 rounded-md"
        width={120}
        height={170}
      />
      <div>
        <h5 className="w-[65px] md:w-[120px] mt-1 text-sm max-md:text-xs truncate px-2">{title}</h5>
      </div>
      <div>
        <span>{index + 1}</span>
      </div>
    </div>
  );
}

export default MovieBookingCard;
