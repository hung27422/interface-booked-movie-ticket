import useSWR from "swr";
import { IBooking, IBookingData } from "../types/Booking";
import bookingServices from "../services/bookingServices";

interface useBookingProps {
  bookingId?: string;
}

function usePayment({ bookingId }: useBookingProps = {}) {
  const { data: bookings, error, mutate: mutateBookings } = useSWR<IBooking[]>("/bookings");

  const { data: dataBookingById, mutate: mutateDataBookingById } = useSWR<IBooking>(
    `/bookings/${bookingId}`
  );

  // Thêm mới một booking
  const addBooking = async (booking: IBookingData) => {
    try {
      const newBooking = await bookingServices.addBooking(booking);
      mutateBookings(); // Cập nhật dữ liệu ngay lập tức
      return newBooking;
    } catch (error) {
      console.error("Lỗi khi thêm đơn đặt vé:", error);
      throw error;
    }
  };

  // Cập nhật một booking
  const updateBooking = async (id: string, booking: IBookingData) => {
    try {
      const updatedBooking = await bookingServices.updateBooking(id, booking);
      mutateBookings();
      mutateDataBookingById(); // Cập nhật dữ liệu ngay lập tức
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
      mutateBookings();
      mutateDataBookingById(); // Cập nhật dữ liệu ngay lập tức
    } catch (error) {
      console.error("Lỗi khi xóa đơn đặt vé:", error);
      throw error;
    }
  };

  return {
    bookings,
    dataBookingById,
    mutateBookings,
    mutateDataBookingById,
    error,
    addBooking,
    updateBooking,
    deleteBooking,
  };
}

export default usePayment;
