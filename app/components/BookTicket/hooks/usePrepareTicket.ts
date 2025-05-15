// hooks/usePrepareTicket.ts
import { IShowTime } from "@/app/types/ShowTime";
import { ITicket } from "@/app/types/Ticket";
import FormattedTime from "@/app/utils/formattedTime";

interface Params {
  getShowTimeById: IShowTime;
  userId?: string;
  codeOrder?: string;
  payDate: string;
}
interface SnackItem {
  quantity: number;
  snackId: {
    name: string;
  };
}
const usePrepareTicket = ({ getShowTimeById, userId, codeOrder, payDate }: Params): ITicket => {
  const savedBooking = JSON.parse(localStorage.getItem("dataBooking") || "{}");
  const seats = savedBooking?.seatNumbers.map((item: unknown) => item);
  const seatsNumber = seats?.join(" - ");

  const snackSummary: string =
    savedBooking?.snacks
      ?.map((item: SnackItem) => `${item.quantity} ${item.snackId.name}`)
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
    codeOrder: codeOrder || "",
    time,
    date: dateShowTime,
    room: getShowTimeById.room?.name || "",
    seatNumbers: seatsNumber || "",
    snacks: snackSummary || "",
    cinemaAddress: getShowTimeById.cinema?.name || "",
    codeTransaction: codeOrder || "",
    urlQrCode:
      "https://cdn.tgdd.vn/GameApp/3/236809/Screentshots/qr-code-generator-cong-cu-tao-ma-qr-tren-dien-thoai-logo-01-04-2021.png",
    payDate: payDate,
    status: "PENDING",
  };
};

export default usePrepareTicket;
