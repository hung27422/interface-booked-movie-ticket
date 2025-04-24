import { IShowTime } from "@/app/types/ShowTime";
import FormattedTime from "@/app/utils/formattedTime";
import Button from "../Button";
import { useAppContext } from "@/app/contexts/AppContextProvider/AppContextProvider";
import { useContext } from "react";
import { IBooking } from "@/app/types/Booking";
import { AuthContext } from "@/app/contexts/AuthContextProvider/AuthContextProvider";
import useBooking from "@/app/hooks/useBooking";

interface TicketSummaryProps {
  getShowTimeById: IShowTime;
}
function TicketSummary({ getShowTimeById }: TicketSummaryProps) {
  // context
  const { selectedSeats, setStepBooking, setIdBooking } = useAppContext();
  const { authState } = useContext(AuthContext);
  // contanst
  const totalPrice = selectedSeats.reduce((total, seat) => {
    const seatType = seat.type || "SINGLE";
    const multiplier =
      getShowTimeById?.seatPricing[seatType as keyof typeof getShowTimeById.seatPricing] ?? 1;
    return total + getShowTimeById.price * multiplier;
  }, 0);

  //hooks
  const dateShowTime = FormattedTime({ isoString: getShowTimeById?.startTime, type: "date" });
  const timeStartShowTime = FormattedTime({ isoString: getShowTimeById?.startTime, type: "time" });
  const timeEndShowTime = FormattedTime({ isoString: getShowTimeById?.endTime, type: "time" });
  const { addBooking } = useBooking();
  // function
  const handleContinueBooking = async () => {
    const addDataTicket: IBooking = {
      userId: authState.user?._id || "",
      showtimeId: getShowTimeById._id || "",
      seatNumbers: selectedSeats.map((seat) => seat.seatNumber.toString()),
      snacks: [],
      ticketPrice: getShowTimeById.price,
      totalPrice: totalPrice,
      status: "PENDING",
    };

    const dataBooking = await addBooking(addDataTicket);

    await setIdBooking(dataBooking.booking._id);

    await setStepBooking((prev) => prev + 1);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="text-xl font-bold text-white">Thông tin vé</div>
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
      <div className="mt-4 bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="text-lg font-bold text-white">Tổng đơn hàng</div>
        <div className="mt-2 text-gray-400">
          <p className="text-white font-semibold mt-2">
            Tổng tiền: {totalPrice.toLocaleString()} VNĐ
          </p>
        </div>
      </div>
      <div className="mt-4">
        <Button
          onClick={handleContinueBooking}
          title="Tiêp tục"
          color="primary"
          variant="contained"
          className="w-32"
        />
      </div>
    </div>
  );
}

export default TicketSummary;
