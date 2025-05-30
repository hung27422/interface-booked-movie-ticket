import useSWR from "swr";
import { ITicket } from "../types/Ticket";
import ticketServices from "../services/ticketServices";
import { useState } from "react";

interface useTicketProps {
  userId?: string;
  idTicket?: string;
  status?: string;
}

function useTicket({ userId, idTicket, status }: useTicketProps = {}) {
  const [isValidSeatNumber, setIsValidSeatNumber] = useState("");

  const { data: dataTicketByUserIDandStatus, mutate: mutateDataTicketByUserIDandStatus } = useSWR<
    ITicket[]
  >(userId && status ? `/tickets/user/${userId}?status=${status}` : null);
  const { data: dataTicketByUser, mutate: mutateDataTicketByUser } = useSWR<ITicket[]>(
    userId ? `/tickets/user/${userId}` : null
  );
  const { data: dataTicketByID } = useSWR<ITicket>(idTicket ? `/tickets/${idTicket}` : null);

  // Thêm mới một booking
  const addTicket = async (ticket: ITicket) => {
    try {
      const newTicket = await ticketServices.addTicket(ticket);
      mutateDataTicketByUserIDandStatus(); // Cập nhật dữ liệu ngay lập tức
      mutateDataTicketByUser();
      return newTicket;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // console.error("Lỗi khi thêm đơn đặt vé:", error);
      console.log({ error });
      setIsValidSeatNumber(error?.response?.data.message);
      console.log({ isValidSeatNumber });

      throw error;
    }
  };

  // Cập nhật một booking
  const updateTicket = async (id: string, ticket: ITicket) => {
    try {
      const updatedTicket = await ticketServices.updateTicket(id, ticket);
      mutateDataTicketByUserIDandStatus(); // Cập nhật dữ liệu ngay lập tức
      mutateDataTicketByUser();
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
      mutateDataTicketByUserIDandStatus(); // Cập nhật dữ liệu ngay lập tức
      mutateDataTicketByUser();
    } catch (error) {
      console.error("Lỗi khi xóa đơn đặt vé:", error);
      throw error;
    }
  };

  return {
    dataTicketByUserIDandStatus,
    dataTicketByUser,
    dataTicketByID,
    mutateDataTicketByUserIDandStatus,
    addTicket,
    updateTicket,
    deleteTicket,
  };
}

export default useTicket;
