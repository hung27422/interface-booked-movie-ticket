import useSWR from "swr";
import { ITicket } from "../types/Ticket";
import ticketServices from "../services/ticketServices";

interface useTicketProps {
  userId?: string;
}

function useTicket({ userId }: useTicketProps = {}) {
  const { data, mutate } = useSWR<ITicket[]>(`/tickets/user/${userId}`);
  const { data: dataTicketByUserID, mutate: mutateDataTicketByUserID } =
    useSWR<ITicket[]>(`/tickets`);

  // Thêm mới một booking
  const addTicket = async (ticket: ITicket) => {
    try {
      const newTicket = await ticketServices.addTicket(ticket);
      mutateDataTicketByUserID(); // Cập nhật dữ liệu ngay lập tức
      mutate();
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
    data,
    dataTicketByUserID,
    mutateDataTicketByUserID,
    addTicket,
    updateTicket,
    deleteTicket,
  };
}

export default useTicket;
