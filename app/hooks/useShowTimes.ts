import useSWR from "swr";
import { IShowTime, IShowtimeByCinemaDate } from "../types/ShowTime";
interface useShowTimeProps {
  idRoom?: string;
  idMovie?: string;
  idShowTime?: string;
  idCinema?: string;
  date?: string;
}
function useShowTime({ idRoom, idMovie, idShowTime, date, idCinema }: useShowTimeProps = {}) {
  const { data: showtimes } = useSWR<IShowTime[]>("/showtimes");

  const { data: getShowTimeByRoomId } = useSWR<IShowTime[]>(`/showtimes/room/${idRoom}`);

  const { data: getShowTimeByRoomIdAndMovieID } = useSWR<IShowTime[]>(
    `/showtimes/filter?roomId=${idRoom}&movieId=${idMovie}`
  );

  const { data: getShowTimeById } = useSWR<IShowTime>(idShowTime && `/showtimes/${idShowTime}`);

  const { data: filterByCinemaDateCinemaId } = useSWR<IShowtimeByCinemaDate>(
    idCinema && date && `/showtimes/filter-by-cinema-date?cinemaId=${idCinema}&releaseDate=${date}`
  );

  return {
    showtimes,
    getShowTimeByRoomId,
    getShowTimeByRoomIdAndMovieID,
    getShowTimeById,
    filterByCinemaDateCinemaId,
  };
}

export default useShowTime;
