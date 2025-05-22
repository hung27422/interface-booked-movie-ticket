import { ITicket } from "@/app/types/Ticket";
import { useEffect, useRef } from "react";
import QRCode from "qrcode";
import { IShowTime } from "@/app/types/ShowTime";
import useRooms from "@/app/hooks/useRooms";
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

  const seats = savedBooking?.seatNumbers.map((item: unknown) => item);

  const seatsNumber = seats?.join(" - ");
  const snackSummary: string =
    savedBooking?.snacks
      ?.map((item: SnackItem) => `${item.quantity} x ${item.snackId.name}`)
      .join(" - ") || "";
  const hasRun = useRef(false);
  useEffect(() => {
    if (hasRun.current) return;
    if (responseCode !== "00" || !ticket) return;

    hasRun.current = true;

    (async () => {
      const qrString = JSON.stringify({
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
        urlQrCode: qrCodeUrl,
      });
      // ✅ Cập nhật ghế đã đặt
      if (getShowTimeById?.room?._id) {
        await updateBookedSeats(getShowTimeById.room._id, seats);
        await mutateRoomById();
        console.log("✅ Ghế đã được cập nhật sau khi thanh toán thành công");
      }
    })();
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
  ]);
};

export default useAddTicketOnPayment;
