import useSWR from "swr";
import { IRoom } from "../types/Rooms";
import roomServices from "../services/roomServices";

interface useRoomsProps {
  idRoom?: string;
  idCinema?: string;
}
function useRooms({ idCinema, idRoom }: useRoomsProps = {}) {
  const { data: rooms, error, mutate } = useSWR<IRoom[]>("/rooms");

  const { data: getRoomsById, mutate: mutateRoomById } = useSWR<IRoom>(
    idRoom ? `/rooms/${idRoom}` : null
  );

  const { data: getRoomsByCinemaId } = useSWR<IRoom[]>(idCinema ? `/rooms/${idCinema}` : null);

  const updateRoom = async (id: string, room: IRoom) => {
    try {
      const updatedRoom = await roomServices.updateRoom(id, room);
      mutate();
      return updatedRoom;
    } catch (error) {
      console.error("Lỗi khi cập nhật room:", error);
      throw error;
    }
  };
  const updateBookedSeats = async (id: string, bookedSeats: string[]) => {
    try {
      const updateBookedSeats = await roomServices.updateBookedSeats(id, bookedSeats);
      mutateRoomById();
      return updateBookedSeats;
    } catch {
      console.error("Lỗi khi cập nhật room:", error);
      throw error;
    }
  };

  return {
    rooms,
    getRoomsById,
    updateBookedSeats,
    mutateRoomById,
    updateRoom,
    getRoomsByCinemaId,
    error,
    mutate,
  };
}

export default useRooms;
