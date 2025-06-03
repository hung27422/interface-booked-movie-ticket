import { ITicket } from "@/app/types/Ticket";
import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import { IShowTime } from "@/app/types/ShowTime";
import useRooms from "@/app/hooks/useRooms";
import useShowTime from "@/app/hooks/useShowTimes";
import useSnackbar from "../../Hooks/useSnackbar";
import useBooking from "@/app/hooks/useBooking";
interface SnackItem {
  quantity: number;
  snackId: {
    name: string;
  };
}
const useAddTicketOnPayment = (
  responseCode: string | null,
  ticket: ITicket | null,
  addTicket: (ticket: ITicket) => Promise<void>,
  getShowTimeById: IShowTime | null
) => {
  const savedBooking = JSON.parse(localStorage.getItem("dataBooking") || "{}");
  const { updateBookedSeats, mutateRoomById } = useRooms();
  const { updateAvailableSeats } = useShowTime();
  const { updateBookingStatus } = useBooking();
  const { showSnackbar } = useSnackbar();
  const seats = savedBooking?.seatNumbers.map((item: unknown) => item);

  const numberSeats = seats.length;
  const seatsNumber = seats?.join(" - ");
  const snackSummary: string =
    savedBooking?.snacks
      ?.map((item: SnackItem) => `${item.quantity} x ${item.snackId.name}`)
      .join(" - ") || "";
  const hasRun = useRef(false);
  useEffect(() => {
    if (hasRun.current) return;

    if (getShowTimeById && getShowTimeById?.availableSeats <= 0) {
      return showSnackbar("Đã hết số lượng ghế đặt", "error");
    }

    if (!ticket) return;

    hasRun.current = true;

    (async () => {
      const qrString = JSON.stringify({
        TinhTrangVe: responseCode === "24" ? "THÀNH CÔNG" : "ĐÃ HỦY",
        MaDonHang: savedBooking?._id,
        Rap: getShowTimeById?.cinema?.name,
        Phim: getShowTimeById?.movie?.title,
        Phong: getShowTimeById?.room?.name,
        Ghe: seatsNumber,
        ThucAn: snackSummary,
      });

      const qrCodeUrl = await QRCode.toDataURL(qrString);

      await addTicket({
        ...ticket,
        status: responseCode === "24" ? "CANCELLED" : "PENDING",
        urlQrCode: responseCode === "24" ? "" : qrCodeUrl,
      });
      if (responseCode === "00") {
        updateBookingStatus(savedBooking._id, "CONFIRMED");
      }
      // ✅ Cập nhật ghế đã đặt
      if (getShowTimeById?.room?._id && responseCode !== "24") {
        await updateBookedSeats(getShowTimeById.room._id, seats);
        await mutateRoomById();
      }
      if (getShowTimeById?._id && responseCode !== "24") {
        await updateAvailableSeats(
          getShowTimeById._id,
          getShowTimeById.availableSeats,
          numberSeats
        );
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    responseCode,
    ticket,
    addTicket,
    savedBooking?._id,
    seatsNumber,
    getShowTimeById?.cinema?.name,
    getShowTimeById?.movie?.title,
    getShowTimeById?.room?.name,
    snackSummary,
    getShowTimeById?.room?._id,
    getShowTimeById?.room?.seats,
    updateBookedSeats,
    seats,
    mutateRoomById,
    getShowTimeById?._id,
    getShowTimeById?.availableSeats,
    updateAvailableSeats,
    numberSeats,
  ]);
};

export default useAddTicketOnPayment;
