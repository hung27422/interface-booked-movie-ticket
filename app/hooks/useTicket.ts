import useSWR from "swr";
import { ITicket } from "../types/Ticket";
import ticketServices from "../services/ticketServices";

interface useTicketProps {
  userId?: string;
  idTicket?: string;
  status?: string;
}

function useTicket({ userId, idTicket, status }: useTicketProps = {}) {
  const { data: dataTicketByUserID, mutate: mutateDataTicketByUserID } = useSWR<ITicket[]>(
    userId && status ? `/tickets/user/${userId}?status=${status}` : null
  );
  const { data: dataTicketByID } = useSWR<ITicket>(idTicket ? `/tickets/${idTicket}` : null);

  // Thêm mới một booking
  const addTicket = async (ticket: ITicket) => {
    try {
      const newTicket = await ticketServices.addTicket(ticket);
      mutateDataTicketByUserID(); // Cập nhật dữ liệu ngay lập tức

      return newTicket;
    } catch (error) {
      console.error("Lỗi khi thêm đơn đặt vé:", error);
      throw error;
    }
  };

  // Cập nhật một booking
  const updateTicket = async (id: string, ticket: ITicket) => {
    try {
      const updatedTicket = await ticketServices.updateTicket(id, ticket);
      mutateDataTicketByUserID(); // Cập nhật dữ liệu ngay lập tức
      return updatedTicket;
    } catch (error) {
      console.error("Lỗi khi cập nhật đơn đặt vé:", error);
      throw error;
    }
  };

  // Xóa một booking
  const deleteTicket = async (id: string) => {
    try {
      await ticketServices.deleteTicket(id);
      mutateDataTicketByUserID(); // Cập nhật dữ liệu ngay lập tức
    } catch (error) {
      console.error("Lỗi khi xóa đơn đặt vé:", error);
      throw error;
    }
  };

  return {
    dataTicketByUserID,
    dataTicketByID,
    mutateDataTicketByUserID,
    addTicket,
    updateTicket,
    deleteTicket,
  };
}

export default useTicket;
