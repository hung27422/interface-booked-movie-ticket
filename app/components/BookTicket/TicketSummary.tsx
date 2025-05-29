import { IShowTime } from "@/app/types/ShowTime";
import FormattedTime from "@/app/utils/formattedTime";
import { useAppContext } from "@/app/contexts/AppContextProvider/AppContextProvider";
import ButtonSeatAndTicketSelector from "./ButtonSeatAndTicketSelector";
import ButtonSnackSelector from "./ButtonSnackSelector";
import ModalDetailTicket from "./ModalDetailTicket";
import { useEffect } from "react";

interface TicketSummaryProps {
  getShowTimeById: IShowTime;
}
function TicketSummary({ getShowTimeById }: TicketSummaryProps) {
  const params = new URLSearchParams(window.location.search);
  const responseCode = params.get("vnp_ResponseCode");
  // context
  const { selectedSeats, stepBooking, totalPriceSnack, setStepBooking } = useAppContext();

  //hooks
  const dateShowTime = FormattedTime({ isoString: getShowTimeById?.startTime, type: "date" });
  const timeStartShowTime = FormattedTime({ isoString: getShowTimeById?.startTime, type: "time" });
  const timeEndShowTime = FormattedTime({ isoString: getShowTimeById?.endTime, type: "time" });

  // contanst
  const totalPriceTicket = selectedSeats.reduce((total, seat) => {
    const seatType = seat.type || "SINGLE";
    const multiplier =
      getShowTimeById?.seatPricing[seatType as keyof typeof getShowTimeById.seatPricing] ?? 1;
    return total + getShowTimeById.price * multiplier;
  }, 0);

  // constant
  const totalPrice = totalPriceSnack ? totalPriceTicket + totalPriceSnack : totalPriceTicket;
  // Check xem thanh toán có thành công hay không

  useEffect(() => {
    if (responseCode === "00" || responseCode === "24") {
      setStepBooking(stepBooking + 3);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="flex flex-col items-start md:items-center justify-start md:justify-center bg-gray-800 p-4 rounded-lg shadow-md ">
        <div className="text-xl font-bold text-white text-center mx-auto">Thông tin vé</div>
        <div className="text-lg text-gray-400 ml-4">
          <p>Phim: {getShowTimeById?.movie?.title}</p>
          <p>
            Suất: {timeStartShowTime} - {timeEndShowTime} -- {dateShowTime}
          </p>
          <p>Phòng: {getShowTimeById?.room?.name}</p>
          <p>Giá vé: {getShowTimeById?.price} VNĐ</p>
          <div className="mt-2">
            <p className="text-lg font-semibold">Ghế đang chọn:</p>
            {selectedSeats.length > 0 ? (
              <ul className="flex flex-wrap mt-1 ml-4">
                {selectedSeats.map((seat) => (
                  <li className="mr-2 mb-1" key={seat._id}>
                    {seat.seatNumber}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="ml-4">Chưa chọn ghế nào</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 bg-gray-800 p-4 rounded-lg shadow-md ">
        <div className="text-lg font-bold text-white">Tổng đơn hàng</div>
        <div className="mt-2 text-gray-400">
          <p className="text-white font-semibold mt-2">
            Tổng tiền: {totalPrice.toLocaleString()} VNĐ
          </p>
        </div>
      </div>
      <div className="mt-4">
        {stepBooking === 0 && <ButtonSeatAndTicketSelector getShowTimeById={getShowTimeById} />}
        {stepBooking === 1 && <ButtonSnackSelector getShowTimeById={getShowTimeById} />}
        {stepBooking === 2 && <ModalDetailTicket getShowTimeById={getShowTimeById} />}
      </div>
    </div>
  );
}

export default TicketSummary;
