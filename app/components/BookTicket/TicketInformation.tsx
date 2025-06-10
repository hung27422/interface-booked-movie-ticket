import { AuthContext } from "@/app/contexts/AuthContextProvider/AuthContextProvider";
import useTicket from "@/app/hooks/useTicket";
import { IShowTime } from "@/app/types/ShowTime";
import Image from "next/image";
import { useContext } from "react";
import usePrepareTicket from "./hooks/usePrepareTicket";
import useAddTicketOnPayment from "./hooks/useAddTicketOnPayment";
import useFormattedDateTime from "@/app/utils/hooks/useFormattedDateTime";
import Base64Image from "../Base64Image";
import useHandleDownloadPDF from "@/app/utils/hooks/useHandleDownloadPDF";
import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import LoaderSpinner from "../LoaderSpinner";
interface TicketInformationProps {
  getShowTimeById: IShowTime;
}
function TicketInformation({ getShowTimeById }: TicketInformationProps) {
  const { authState } = useContext(AuthContext);

  const params = new URLSearchParams(window.location.search);
  const responseCode = params.get("vnp_ResponseCode");
  const codeTransactionNo = params.get("vnp_TransactionNo");
  const responsePayDate = params.get("vnp_PayDate");
  const payDate = useFormattedDateTime(responsePayDate || "");
  const ticketRef = React.useRef<HTMLDivElement>(null);

  const { dataTicketByUser, addTicket } = useTicket({
    userId: authState.user?._id,
  });
  // tạo object vé cần thêm dựa trên showtime, user, mã đơn hàng
  const ticket = usePrepareTicket({
    getShowTimeById,
    userId: authState.user?._id,
    codeTransactionNo: codeTransactionNo || "",
    payDate: payDate,
  });
  // Always call the hook, passing nulls if ticket is not ready yet
  useAddTicketOnPayment(responseCode, ticket, addTicket, getShowTimeById);

  const { handleDownloadPDF } = useHandleDownloadPDF({ ticketRef });

  if (!ticket) {
    return <p>Đang xử lý vé...</p>; // hoặc hiển thị spinner
  }

  // Lấy thông tin vé từ API
  const data = dataTicketByUser?.[0];
  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <div>
      <div
        ref={ticketRef}
        className="flex flex-col w-full max-w-[600px] bg-gray-800 mx-auto border-white border-2 rounded-lg px-4 py-2"
      >
        <div>
          <h1
            className={`text-xl sm:text-2xl font-bold text-center ${
              responseCode === "24" ? "text-red-500" : "text-white"
            } `}
          >
            Thông tin vé {responseCode === "24" && "(Đã hủy)"}
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
          <Image src={data?.imageCinema} alt="img-film" width={40} height={40} />
          <div className="flex flex-col text-white text-center sm:text-left">
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
            className="rounded-lg w-full h-60 sm:h-80 object-cover"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-dashed border-b-2 border-b-gray-300 py-2 text-white gap-2">
          <div className="flex flex-col">
            <span>
              Mã đặt vé: <p>{data.codeOrder}</p>
            </span>
            <span>
              Thời gian:
              <p>
                {data.time} - {data.date}
              </p>
            </span>
          </div>
          <div className="flex items-center justify-center">
            <Base64Image base64={data.urlQrCode} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-dashed border-b-2 border-b-gray-300 text-white gap-2">
          <div className="flex flex-col">
            <span>Phòng chiếu: {data.room}</span>
            <span>Số ghế: {data.seatNumbers}</span>
            <span>Rạp chiếu: {data.cinemaName}</span>
            <span>Địa chỉ: {data.cinemaAddress}</span>
          </div>
          <div className="sm:text-right">Thức ăn kèm: {data.snacks}</div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between py-2 border-dashed border-b-2 border-b-gray-300 text-white gap-2">
          <span>Mã giao dịch: {data.codeTransaction}</span>
          <span>Thời gian giao dịch: {data?.payDate}</span>
        </div>

        <div>
          <h5 className="text-center mx-auto mt-2 text-white">Thông tin người nhận</h5>
          <div className="flex items-center justify-between border-dashed border-b-2 border-b-gray-300 py-2 text-white">
            <div className="flex flex-col">
              <span>Họ tên: {authState.user?.fullName}</span>
              <span>SĐT: {authState.user?.phone}</span>
              <span>Email: {authState.user?.email}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-4">
          <Button
            onClick={handleDownloadPDF}
            color="secondary"
            variant="contained"
            className="text-sm sm:text-base"
          >
            Lưu vé (PDF)
          </Button>
        </div>
      </div>
      <div className="mt-5 w-1/2 mx-auto text-center flex item-center justify-center">
        <Link href="/pages/my-ticket">
          <Button
            color="primary"
            variant="contained"
            className="text-sm sm:text-base mt-4 w-full max-w-[620px] mx-auto"
          >
            Vé của tôi
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default TicketInformation;
