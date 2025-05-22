import { IRoom } from "../types/Rooms";
import api from "../utils/api";

const roomServices = {
  // Sửa phòng
  updateRoom: (id: string, room: IRoom) => api.put(`/rooms/${id}`, room).then((res) => res.data),

  // Cập nhật ghế đã đặt
  updateBookedSeats: (id: string, bookedSeats: string[]) =>
    api.patch(`/rooms/${id}/update-seats`, { bookedSeats }).then((res) => res.data),
};

export default roomServices;
