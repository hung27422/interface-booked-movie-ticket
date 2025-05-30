import api from "../utils/api";

const showtimeServices = {
  updateAvailableSeats: (id: string, totalSeats: number, bookedSeats: number) =>
    api
      .patch(`/showtimes/${id}/available-seats`, { totalSeats, bookedSeats })
      .then((res) => res.data),
};

export default showtimeServices;
