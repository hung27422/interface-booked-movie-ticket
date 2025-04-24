import useSWR from "swr";
import { IBooking } from "../types/Booking";
import bookingServices from "../services/bookingServices";

interface useBookingProps {
  status?: string;
}

function useBooking({ status }: useBookingProps = {}) {
  // Dữ liệu tất cả các booking
  const { data: bookings, error, mutate } = useSWR<IBooking[]>("/bookings");

  // Dữ liệu tìm kiếm theo trạng thái (nếu có)
  const { data: dataSearchBookings } = useSWR<IBooking[]>(
    status && `/bookings/search?status=${status}`
  );

  // Thêm mới một booking
  const addBooking = async (booking: IBooking) => {
    try {
      const newBooking = await bookingServices.addBooking(booking);
      mutate(); // Cập nhật dữ liệu ngay lập tức
      console.log({ newBooking });
      return newBooking;
    } catch (error) {
      console.error("Lỗi khi thêm đơn đặt vé:", error);
      throw error;
    }
  };

  // Cập nhật một booking
  const updateBooking = async (id: string, booking: IBooking) => {
    try {
      const updatedBooking = await bookingServices.updateBooking(id, booking);
      mutate(); // Cập nhật dữ liệu ngay lập tức
      console.log({ updatedBooking });
      return updatedBooking;
    } catch (error) {
      console.error("Lỗi khi cập nhật đơn đặt vé:", error);
      throw error;
    }
  };

  // Xóa một booking
  const deleteBooking = async (id: string) => {
    try {
      await bookingServices.deleteBooking(id);
      mutate(); // Cập nhật dữ liệu ngay lập tức
    } catch (error) {
      console.error("Lỗi khi xóa đơn đặt vé:", error);
      throw error;
    }
  };

  return { bookings, dataSearchBookings, error, addBooking, updateBooking, deleteBooking };
}

export default useBooking;
