import { useAppContext } from "@/app/contexts/AppContextProvider/AppContextProvider";
import Button from "../Button";

function ButtonConfirmPayment() {
  const { setStepBooking, stepBooking } = useAppContext();
  const handleConfirmPayment = async () => {
    await setStepBooking((prev) => prev + 1);
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
        onClick={handleConfirmPayment}
        title="Xác nhận"
        color="primary"
        variant="contained"
        className="w-32"
      />
    </div>
  );
}

export default ButtonConfirmPayment;
