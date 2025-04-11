import useSWR from "swr";
import { IShowTime, IShowtimeByCinemaDate } from "../types/ShowTime";
interface useShowTimeProps {
  idRoom?: string;
  idMovie?: string;
  idCinema?: string;
  date?: string;
}
function useShowTime({ idRoom, idMovie, idCinema, date }: useShowTimeProps = {}) {
  const { data: showtimes, error } = useSWR<IShowTime[]>("/showtimes");
  const { data: getShowTimeByRoomId } = useSWR<IShowTime[]>(idRoom && `/showtimes/room/${idRoom}`);
  const { data: getShowTimeByRoomIdAndMovieID } = useSWR<IShowTime[]>(
    idRoom && idMovie && `/showtimes/filter?roomId=${idRoom}&movieId=${idMovie}`
  );
  const { data: filterByCinemaDateCinemaId } = useSWR<IShowtimeByCinemaDate[]>(
    idCinema && date && `/showtimes/filter-by-cinema-date?cinemaId=${idCinema}&releaseDate=${date}`
  );

  return {
    showtimes,
    getShowTimeByRoomId,
    getShowTimeByRoomIdAndMovieID,
    filterByCinemaDateCinemaId,
    error,
  };
}

export default useShowTime;
