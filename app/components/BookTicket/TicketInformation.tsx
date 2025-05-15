import { AuthContext } from "@/app/contexts/AuthContextProvider/AuthContextProvider";
import useTicket from "@/app/hooks/useTicket";
import { IShowTime } from "@/app/types/ShowTime";
import Image from "next/image";
import { useContext } from "react";
import usePrepareTicket from "./hooks/usePrepareTicket";
import useAddTicketOnPayment from "./hooks/useAddTicketOnPayment";
import useFormattedDateTime from "@/app/utils/hooks/useFormattedDateTime";
interface TicketInformationProps {
  getShowTimeById: IShowTime;
}
function TicketInformation({ getShowTimeById }: TicketInformationProps) {
  const params = new URLSearchParams(window.location.search);
  const responseCode = params.get("vnp_TransactionStatus");
  const codeOrder = params.get("vnp_TransactionNo");
  
  const responsePayDate = params.get("vnp_PayDate");
  const payDate = useFormattedDateTime(responsePayDate || "");

  const { authState } = useContext(AuthContext);

  const { dataTicketByUserID, addTicket } = useTicket({
    userId: authState.user?._id,
  });
  // tạo object vé cần thêm dựa trên showtime, user, mã đơn hàng
  const tickets = usePrepareTicket({
    getShowTimeById,
    userId: authState.user?._id,
    codeOrder: codeOrder || "",
    payDate: payDate,
  });

  //Tạo vé khi thanh toán thành công
  useAddTicketOnPayment(responseCode, tickets, addTicket);

  // Lấy thông tin vé từ API
  const data = dataTicketByUserID?.[0];
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col bg-gray-700 w-1/2 mx-auto border-white border-2 rounded-lg px-4 py-2">
      <div>
        <h1 className="text-2xl font-bold text-center">Thông tin vé</h1>
      </div>
      <div className="flex items-center gap-3">
        <Image src={data?.imageCinema} alt="img-film" width={40} height={40} />
        <div className="flex flex-col">
          <span className="text-sm">{data.cinemaName}</span>
          <span className="text-base font-bold">Phim: {data.movieName}</span>
          <span className="text-sm">{data.caption}</span>
        </div>
      </div>
      <div className="flex items-center justify-center py-4">
        <Image
          src={data.imageMovie}
          alt="img"
          width={300}
          height={300}
          className="rounded-lg w-full h-80"
        />
      </div>
      <div className="flex items-center justify-between border-dashed border-b-2 border-b-gray-300 py-2">
        <div className="flex flex-col">
          <span>Mã đặt vé: {data.codeOrder}</span>
          <span>
            Thời gian: {data.time} - {data.date}
          </span>
        </div>
        <div>
          <Image src={data.urlQrCode} alt="img" width={100} height={100} className="rounded-lg" />
        </div>
      </div>
      <div className="flex items-center justify-between py-2 border-dashed border-b-2 border-b-gray-300">
        <div className="flex flex-col">
          <span>Phòng chiếu : {data.room}</span>
          <span>Số ghế: {data.seatNumbers}</span>
          <span>Rạp chiếu: {data.cinemaName}</span>
          <span>Địa chỉ: {data.cinemaAddress}</span>
        </div>
        <div>Thức ăn kèm: {data.snacks}</div>
      </div>
      <div className="flex items-center justify-between py-2 border-dashed border-b-2 border-b-gray-300">
        <span>Mã giao dịch: {data.codeTransaction}</span>
        <span>Thời gian giao dịch: {data?.payDate}</span>
      </div>
      <div>
        <h5 className="text-center mx-auto mt-2">Thông tin người nhận</h5>
        <div className="flex items-center justify-between border-dashed border-b-2 border-b-gray-300 py-2">
          <div className="flex flex-col">
            <span>Họ tên: {authState.user?.fullName}</span>
            <span>Số điện thoại: {authState.user?.phone}</span>
            <span>Email:{authState.user?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketInformation;
