import useSWR from "swr";
import { IRoom } from "../types/Rooms";

interface useRoomsProps {
  idRoom?: string;
  idCinema?: string;
}
function useRooms({ idCinema, idRoom }: useRoomsProps = {}) {
  const { data: rooms, error, mutate } = useSWR<IRoom[]>("/rooms");

  const { data: getRoomsById } = useSWR<IRoom>(idRoom ? `/rooms/${idRoom}` : null);

  const { data: getRoomsByCinemaId } = useSWR<IRoom[]>(idCinema ? `/rooms/${idCinema}` : null);

  return { rooms, getRoomsById, getRoomsByCinemaId, error, mutate };
}

export default useRooms;
