import { ITicket } from "../types/Ticket";
import api from "../utils/api";

const ticketServices = {
  // Thêm phim
  addTicket: (ticket: ITicket) => api.post("/tickets", ticket).then((res) => res.data),
  // Sửa phim
  updateTicket: (id: string, ticket: ITicket) =>
    api.put(`/tickets/${id}`, ticket).then((res) => res.data),
  // Xóa phim
  deleteTicket: (id: string) => api.delete(`/tickets/${id}`).then((res) => res.data),
};

export default ticketServices;
