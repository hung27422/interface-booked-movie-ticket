import { useAppContext } from "@/app/contexts/AppContextProvider/AppContextProvider";
import Button from "../Button";
import { AuthContext } from "@/app/contexts/AuthContextProvider/AuthContextProvider";
import { useContext } from "react";
import useBooking from "@/app/hooks/useBooking";
import useSnackbar from "../Hooks/useSnackbar";
import { IShowTime } from "@/app/types/ShowTime";
import { IBookingData } from "@/app/types/Booking";
interface ButtonContinueBookingProps {
  getShowTimeById: IShowTime;
}
function ButtonContinueBooking({ getShowTimeById }: ButtonContinueBookingProps) {
  // context
  const { selectedSeats, setStepBooking, setIdBooking } = useAppContext();

  const { authState } = useContext(AuthContext);
  // hooks
  const { addBooking } = useBooking();
  const { showSnackbar } = useSnackbar();

  // functions
  const handleSeatAndTicketSelector = async () => {
    if (selectedSeats.length === 0) {
      showSnackbar("Vui lòng chọn ghế để tiếp tục", "error");
      return;
    }
    const addDataTicket: IBookingData = {
      userId: authState.user?._id || "",
      showtimeId: getShowTimeById._id || "",
      seatNumbers: selectedSeats.map((seat) => seat.seatNumber.toString()),
      snacks: [],
      ticketPrice: getShowTimeById.price,
      status: "PENDING",
    };
    const dataBooking = await addBooking(addDataTicket);
    await setIdBooking(dataBooking.booking._id);
    await setStepBooking((prev) => prev + 1);
  };
  return (
    <>
      <Button
        onClick={handleSeatAndTicketSelector}
        title="Tiêp tục"
        color="primary"
        variant="contained"
        className="w-32"
      />
    </>
  );
}

export default ButtonContinueBooking;
