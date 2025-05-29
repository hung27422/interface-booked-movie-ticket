// hooks/usePrepareTicket.ts
import { IShowTime } from "@/app/types/ShowTime";
import { ITicket } from "@/app/types/Ticket";
import FormattedTime from "@/app/utils/formattedTime";
interface Params {
  getShowTimeById: IShowTime;
  userId?: string;
  codeTransactionNo?: string;
  payDate: string;
}
interface SnackItem {
  quantity: number;
  snackId: {
    name: string;
  };
}
const usePrepareTicket = ({
  getShowTimeById,
  userId,
  codeTransactionNo,
  payDate,
}: Params): ITicket => {
  const savedBooking = JSON.parse(localStorage.getItem("dataBooking") || "{}");

  const seats = savedBooking?.seatNumbers.map((item: unknown) => item);
  const seatsNumber = seats?.join(" - ");

  const snackSummary: string =
    savedBooking?.snacks
      ?.map((item: SnackItem) => `${item.quantity} x ${item.snackId.name}`)
      .join(" - ") || "";

  const dateShowTime = FormattedTime({ isoString: getShowTimeById?.startTime, type: "date" });
  const timeStartShowTime = FormattedTime({ isoString: getShowTimeById?.startTime, type: "time" });
  const timeEndShowTime = FormattedTime({ isoString: getShowTimeById?.endTime, type: "time" });
  const time = `${timeStartShowTime} - ${timeEndShowTime}`;

  return {
    userId: userId || "",
    cinemaName: getShowTimeById.cinema?.name || "",
    movieName: getShowTimeById.movie?.title || "",
    caption: getShowTimeById.movie?.caption || "",
    imageMovie: getShowTimeById.movie?.poster || "",
    imageCinema: getShowTimeById.cinema?.image || "",
    codeOrder: savedBooking?._id || "",
    time,
    date: dateShowTime,
    room: getShowTimeById.room?.name || "",
    seatNumbers: seatsNumber || "",
    snacks: snackSummary || "",
    cinemaAddress: getShowTimeById.cinema?.name || "",
    codeTransaction: codeTransactionNo || "",
    urlQrCode: "",
    payDate: payDate,
    status: "PENDING",
  };
};

export default usePrepareTicket;
