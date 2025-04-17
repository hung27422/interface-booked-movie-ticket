import Link from "next/link";
import { IShowtimeByCinemaDate } from "../types/ShowTime";
import FormattedTime from "../utils/formattedTime";

interface MovieShowTimesProps {
  data: IShowtimeByCinemaDate[];
}
const MovieShowTimes = ({ data }: MovieShowTimesProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {data.map((item) => {
        const isPast = new Date(item.startTime) < new Date();
        const time = FormattedTime({ isoString: item.startTime, type: "time" });

        return (
          <Link
            key={item._id}
            href={isPast ? "#" : `pages/book-ticket/${item._id}`}
            className={`p-3 tech-border rounded text-sm w-16 h-10 flex flex-col justify-center items-center font-bold
              ${isPast ? "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none" : ""}
            `}
          >
            {time}
            <span className="text-gray-400 text-sm font-bold">88K</span>
          </Link>
        );
      })}
    </div>
  );
};

export default MovieShowTimes;
