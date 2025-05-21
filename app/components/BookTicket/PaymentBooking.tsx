import { useAppContext } from "@/app/contexts/AppContextProvider/AppContextProvider";
import { AuthContext } from "@/app/contexts/AuthContextProvider/AuthContextProvider";

import Image from "next/image";
import { useContext } from "react";
import CheckIcon from "@mui/icons-material/Check";
import useBooking from "@/app/hooks/useBooking";
const banks = [
  {
    id: 1,
    name: "VN PAY",
    img: "https://dms.inet.vn/uploads/public/2017/04/27/1493267750016_apps-icon-vnpay.png",
  },
  {
    id: 2,
    name: "Paypal",
    img: "https://rushdah-ir.com/wp-content/uploads/2018/03/payal-img.webp",
  },
];
function PaymentBooking() {
  // Context
  const { idBooking, idBank, setIdBank } = useAppContext();
  const { authState } = useContext(AuthContext);
  // State
  const { dataBookingById: dataBooking } = useBooking({ bookingId: idBooking });

  if (!dataBooking) {
    return <div>Loading...</div>;
  }

  const seats = dataBooking?.seatNumbers.map((item) => item);
  const totalPriceSeats = dataBooking?.ticketPrice * (dataBooking?.seatNumbers.length || 0);
  const totalSnack = dataBooking.snacks.reduce((a, b) => a + b.subtotal, 0);
  const totalOrder = totalPriceSeats + totalSnack;
  return (
    <div>
      <div>
        <div className="text-pink-500 bg-blue-950 p-2 rounded-lg text-center">
          <span className="text-xl">TÓM TẮT ĐƠN HÀNG</span>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 items-center justify-center text-lg text-pink-400 border-2 border-[#9400ff] rounded-md py-1 px-4 mt-2">
          <span className="col-span-1 md:col-span-2">Mô tả</span>
          <span className="col-span-1 mx-auto">Số lượng</span>
          <span className="col-span-1 mx-auto">Thành tiền</span>
        </div>
        <div className="border-2 border-[#9400ff] rounded-md py-1 px-2 mt-2">
          {/* Ghế */}
          <div className="grid grid-cols-3 md:grid-cols-4 items-center justify-center text-base py-1 border-b border-gray-500 px-2">
            <span className="col-span-1 md:col-span-2">Ghế: {seats?.join(" - ")}</span>
            <span className="col-span-1 mx-auto">{dataBooking?.seatNumbers.length}</span>
            <span className="col-span-1 mx-auto">{totalPriceSeats.toLocaleString()}đ</span>
          </div>
          {/* Bắp nước */}
          <div className="py-1 border-b border-gray-500 px-2">
            {dataBooking?.snacks.map((item) => {
              return (
                <div
                  key={item.snackId._id}
                  className="grid grid-cols-3 md:grid-cols-4 items-center justify-center text-base"
                >
                  <span className="gap-2 col-span-1 md:col-span-2">{item.snackId.name}</span>
                  <span className="col-span-1 mx-auto">{item.quantity}</span>
                  <span className="col-span-1 mx-auto">{item.subtotal.toLocaleString()}đ</span>
                </div>
              );
            })}
          </div>
          {/* Tổng tiền */}
          <div className="grid grid-cols-3 md:grid-cols-4 items-center justify-center text-base px-2 py-2">
            <span className="gap-2 col-span-1 md:col-span-2">Tổng tiền</span>
            <span className="col-span-1 mx-auto"></span>
            <span className="col-span-1 mx-auto">{totalOrder.toLocaleString()}đ</span>
          </div>
        </div>
      </div>
      {/* Thông tin cá nhân */}
      <div className="mt-6">
        <div className="text-pink-500 bg-blue-950 p-2 rounded-lg text-center ">
          <span className="text-xl">THÔNG TIN CÁ NHÂN</span>
        </div>
        <div className="flex flex-col md:grid grid-cols-3 items-center justify-center text-center py-2 border-2 border-[#9400ff] rounded-lg mt-2 text-base">
          <span className="col-span-1">Họ và tên: {authState.user?.fullName} </span>
          <span className="col-span-1">Số điện thoại: {authState.user?.phone} </span>
          <span className="col-span-1">Email: {authState.user?.email} </span>
        </div>
      </div>
      {/* Hình thức thanh toán */}
      <div className="mt-6">
        <div className="text-pink-500 bg-blue-950 p-2 rounded-lg text-center">
          <span className="text-xl">HÌNH THỨC THANH TOÁN</span>
        </div>
        <div className="flex flex-col items-center py-2 border-2 border-[#9400ff] rounded-lg mt-2 text-base p-2">
          {banks.map((item) => {
            return (
              <div
                key={item.id}
                className={`flex items-center ${
                  idBank === item.id ? "bg-gray-800" : ""
                }  p-2 w-full rounded-xl cursor-pointer`}
                onClick={() => setIdBank(item.id)}
              >
                <Image
                  className="bg-white p-1 rounded-lg"
                  src={item.img}
                  alt={`logo-${item.name}`}
                  width={40}
                  height={40}
                />
                <span className="text-lg ml-3">{item.name}</span>
                {idBank === item.id ? (
                  <span className="ml-3">
                    <CheckIcon className="text-green-500" />
                  </span>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PaymentBooking;
