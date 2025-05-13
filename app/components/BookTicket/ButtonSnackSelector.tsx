import { useAppContext } from "@/app/contexts/AppContextProvider/AppContextProvider";
import Button from "../Button";
import { IBookingData } from "@/app/types/Booking";
import { AuthContext } from "@/app/contexts/AuthContextProvider/AuthContextProvider";
import { useContext } from "react";
import { IShowTime } from "@/app/types/ShowTime";
import useBooking from "@/app/hooks/useBooking";
interface ButtonSnackSelectorProps {
  getShowTimeById: IShowTime;
}
function ButtonSnackSelector({ getShowTimeById }: ButtonSnackSelectorProps) {
  const { stepBooking, setStepBooking, idBooking, selectedSnacks } = useAppContext();
  const { authState } = useContext(AuthContext);
  // hooks
  const { dataBookingById, updateBooking } = useBooking({
    bookingId: idBooking,
  });

  const handleSnackSelector = async () => {
    const updateDataBooking: IBookingData = {
      userId: authState.user?._id || "",
      showtimeId: getShowTimeById._id || "",
      seatNumbers: dataBookingById?.seatNumbers.map((item) => item.toString()) || [],
      status: "PENDING",
      snacks: selectedSnacks.map((item) => ({
        snackId: item.snackId,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal,
      })),
      ticketPrice: getShowTimeById.price,
    };
    await updateBooking(idBooking, updateDataBooking);

    await setStepBooking(stepBooking + 1);
  };
  return (
    <div className="flex items-center gap-2">
      <Button
        title="Trở lại"
        color="inherit"
        variant="outlined"
        className="w-24"
        onClick={() => setStepBooking(stepBooking - 1)}
      />
      <Button
        onClick={handleSnackSelector}
        title="Tiêp tục"
        color="primary"
        variant="contained"
        className="w-32"
      />
    </div>
  );
}

export default ButtonSnackSelector;
