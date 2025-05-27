import useSWR from "swr";
import { IShowTime, IShowtimeByCinemaDate } from "../types/ShowTime";
import { IGroupedByLocation } from "../types/Cinemas";
interface useShowTimeProps {
  location?: string;
  idRoom?: string;
  idMovie?: string;
  idShowTime?: string;
  idCinema?: string;
  date?: string;
}
function useShowTime({
  location,
  idRoom,
  idMovie,
  idShowTime,
  date,
  idCinema,
}: useShowTimeProps = {}) {
  const { data: showtimes } = useSWR<IShowTime[]>("/showtimes");

  const { data: getShowTimeByRoomId } = useSWR<IShowTime[]>(`/showtimes/room/${idRoom}`);

  const { data: getShowTimeByRoomIdAndMovieID } = useSWR<IShowTime[]>(
    `/showtimes/filter?roomId=${idRoom}&movieId=${idMovie}`
  );

  const { data: getShowTimeById } = useSWR<IShowTime>(idShowTime && `/showtimes/${idShowTime}`);

  const { data: filterByCinemaDateCinemaId } = useSWR<IShowtimeByCinemaDate>(
    idCinema && date && `/showtimes/filter-by-cinema-date?cinemaId=${idCinema}&releaseDate=${date}`
  );

  const { data: getCinemasByMovieId, error: errorCinemasByMovieId } = useSWR<IGroupedByLocation[]>(
    idMovie && location && `/showtimes/group-by-location?movieId=${idMovie}&location=${location}`
  );

  return {
    showtimes,
    getShowTimeByRoomId,
    getShowTimeByRoomIdAndMovieID,
    getShowTimeById,
    getCinemasByMovieId,
    errorCinemasByMovieId,
    filterByCinemaDateCinemaId,
  };
}

export default useShowTime;
