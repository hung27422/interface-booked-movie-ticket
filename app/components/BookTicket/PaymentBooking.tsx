import { useAppContext } from "@/app/contexts/AppContextProvider/AppContextProvider";
import useBooking from "@/app/hooks/useBooking";

function PaymentBooking() {
  const { idBooking } = useAppContext();
  console.log({ idBooking });

  const { dataBookingById: dataBooking, bookings } = useBooking({ bookingId: idBooking });

  if (!dataBooking) {
    return <div>Loading...</div>;
  }
  console.log({ dataBooking, bookings });

  const seats = dataBooking?.seatNumbers.map((item) => item);
  const totalPriceSeats = dataBooking?.ticketPrice * (dataBooking?.seatNumbers.length || 0);
  return (
    <div>
      <div>
        <div className="text-pink-500 bg-blue-950 p-2 rounded-lg text-center">
          <span className="text-xl">TÓM TẮT ĐƠN HÀNG</span>
        </div>
        <div className="grid grid-cols-4 items-center justify-center text-lg text-pink-400 border-2 border-[#9400ff] rounded-md py-1 px-2 mt-2">
          <span className="col-span-2">Mô tả</span>
          <span className="col-span-1 mx-auto">Số lượng</span>
          <span className="col-span-1 mx-auto">Thành tiền</span>
        </div>
        <div className="border-2 border-[#9400ff] rounded-md py-1 px-2 mt-2">
          {/* Ghế */}
          <div className="grid grid-cols-4 items-center justify-center text-base py-1">
            <span className="gap-2 col-span-2">Ghế: {seats?.join(" - ")}</span>
            <span className="col-span-1 mx-auto">{dataBooking?.seatNumbers.length}</span>
            <span className="col-span-1 mx-auto">{totalPriceSeats.toLocaleString()}đ</span>
          </div>
          {/* Bắp */}
          <div className="py-1">
            {dataBooking?.snacks.map((item) => {
              return (
                <div
                  key={item.snackId._id}
                  className="grid grid-cols-4 items-center justify-center text-base"
                >
                  <span className="gap-2 col-span-2">{item.snackId.name}</span>
                  <span className="col-span-1 mx-auto">{item.quantity}</span>
                  <span className="col-span-1 mx-auto">{item.subtotal.toLocaleString()}đ</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentBooking;
