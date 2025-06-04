import useSWR from "swr";
import { IShowTime, IShowtimeByCinemaDate } from "../types/ShowTime";
import { IGroupedByLocation } from "../types/Cinemas";
import showtimeServices from "../services/showtimeServices";
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
  const { data: showtimes } = useSWR<IShowTime[]>("/showtimes/getAll");

  const { data: getShowTimeByRoomId } = useSWR<IShowTime[]>(
    idRoom ? `/showtimes/room/${idRoom}` : null
  );

  const { data: getShowTimeByRoomIdAndMovieID } = useSWR<IShowTime[]>(
    idRoom && idMovie ? `/showtimes/filter?roomId=${idRoom}&movieId=${idMovie}` : null
  );

  const { data: getShowTimeById, mutate: mutateShowTimeById } = useSWR<IShowTime>(
    idShowTime && `/showtimes/${idShowTime}`
  );

  const { data: filterByCinemaDateCinemaId } = useSWR<IShowtimeByCinemaDate>(
    idCinema &&
      date &&
      `/showtimes/filter-by-cinema-date?cinemaId=${idCinema}&releaseDate=${date}&idMovie=${
        idMovie ? idMovie : ""
      }`
  );

  const { data: getCinemasByMovieId, error: errorCinemasByMovieId } = useSWR<IGroupedByLocation[]>(
    idMovie && location && `/showtimes/group-by-location?movieId=${idMovie}&location=${location}`
  );
  const updateAvailableSeats = async (id: string, totalSeats: number, bookedSeats: number) => {
    try {
      const updateAvailableSeats = await showtimeServices.updateAvailableSeats(
        id,
        totalSeats,
        bookedSeats
      );
      mutateShowTimeById();
      return updateAvailableSeats;
    } catch (error) {
      console.error("Lỗi khi cập nhật room:", error);
      throw error;
    }
  };
  return {
    showtimes,
    getShowTimeByRoomId,
    getShowTimeByRoomIdAndMovieID,
    getShowTimeById,
    getCinemasByMovieId,
    errorCinemasByMovieId,
    filterByCinemaDateCinemaId,
    updateAvailableSeats,
  };
}

export default useShowTime;
