import { IBooking } from "../types/Booking";
import api from "../utils/api";

const BookingServices = {
  // Thêm phim
  addBooking: (booking: IBooking) => api.post("/bookings", booking).then((res) => res.data),
  // Sửa phim
  updateBooking: (id: string, booking: IBooking) =>
    api.put(`/Bookings/${id}`, booking).then((res) => res.data),
  // Xóa phim
  deleteBooking: (id: string) => api.delete(`/bookings/${id}`).then((res) => res.data),
};

export default BookingServices;
