import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useAppContext } from "@/app/contexts/AppContextProvider/AppContextProvider";
import Button from "../Button";
import { IShowTime } from "@/app/types/ShowTime";
import FormattedTime from "@/app/utils/formattedTime";
import { useContext } from "react";
import { AuthContext } from "@/app/contexts/AuthContextProvider/AuthContextProvider";
import CloseIcon from "@mui/icons-material/Close";
import useBooking from "@/app/hooks/useBooking";
import paymentServices from "@/app/services/paymentServices";

const style = {
  position: "absolute",
  color: "white",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%", // Chiếm 90% chiều rộng màn hình
  maxWidth: 500, // Giới hạn tối đa trên desktop
  bgcolor: "rgba(0, 0, 0, 0.9)",
  border: "2px solid #ff00ff",
  boxShadow: 24,
  borderRadius: 4,
  maxHeight: "90vh", // Tránh tràn màn hình nhỏ
  overflowY: "auto", // Kích hoạt scroll nếu nội dung dài
  paddingBottom: 2,
};

interface ModalInfoTicketProps {
  getShowTimeById: IShowTime;
}
export default function ModalDetailTicket({ getShowTimeById }: ModalInfoTicketProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // context
  const { setStepBooking, stepBooking, selectedSeats, idBank, idBooking } = useAppContext();
  const { authState } = useContext(AuthContext);
  // hooks
  const { dataBookingById: dataBooking } = useBooking({ bookingId: idBooking });

  // function
  const handlePayment = async () => {
    if (idBank === 1) {
      try {
        const response = await paymentServices.addPaymentVNPay(getShowTimeById._id ?? "");
        if (response.success && response.paymentUrl) {
          window.location.href = response.paymentUrl;
        } else {
          alert("Không tạo được thanh toán VNPay");
        }
      } catch (error) {
        console.error("Lỗi khi tạo thanh toán:", error);
        alert("Đã có lỗi xảy ra khi thanh toán.");
      }
    } else if (idBank === 2) {
      // handle payment with Paypal
    }
    if (dataBooking) {
      localStorage.setItem("dataBooking", JSON.stringify(dataBooking));
    }
  };
  // constants
  const dateShowTime = FormattedTime({ isoString: getShowTimeById?.startTime, type: "date" });
  const timeStartShowTime = FormattedTime({ isoString: getShowTimeById?.startTime, type: "time" });
  const timeEndShowTime = FormattedTime({ isoString: getShowTimeById?.endTime, type: "time" });

  const totalPriceSeats =
    (dataBooking && dataBooking?.ticketPrice * (dataBooking?.seatNumbers.length || 0)) || 0;
  const totalSnack = (dataBooking && dataBooking.snacks.reduce((a, b) => a + b.subtotal, 0)) || 0;
  const totalOrder = totalPriceSeats + totalSnack;
  return (
    <div>
      <div className="flex items-center gap-2">
        <Button
          title="Trở lại"
          color="inherit"
          variant="outlined"
          className="w-24"
          onClick={() => setStepBooking(stepBooking - 1)}
        />
        <Button
          onClick={handleOpen}
          title="Xác nhận"
          color="primary"
          variant="contained"
          className="w-32"
        />
      </div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock
      >
        <Box sx={style}>
          <div className="flex items-center justify-between border-b-2 border-b-gray-300 w-full p-4">
            <h4 className="text-pink-500 font-bold">Xác nhận đơn hàng</h4>
            <div>
              <CloseIcon
                onClick={handleClose}
                className="cursor-pointer hover:text-red-500"
                fontSize="small"
              />
            </div>
          </div>
          <div className="px-4 mt-4">
            <div className="grid items-center grid-cols-4 gap-4 border-b border-b-gray-200  py-2">
              <span className="col-span-1">Rạp</span>
              <span className="col-span-3">{getShowTimeById.cinema?.name}</span>
            </div>
            <div className="grid items-center grid-cols-4 gap-4 border-b border-b-gray-200  py-2">
              <span className="col-span-1">Phim</span>
              <span className="col-span-3">{getShowTimeById.movie?.title}</span>
            </div>
            <div className="grid items-center grid-cols-4 gap-4 border-b border-b-gray-200  py-2">
              <span className="col-span-1">Suất</span>
              <span className="col-span-3">
                {timeStartShowTime} - {timeEndShowTime} -- {dateShowTime}
              </span>
            </div>
            <div className="grid items-center grid-cols-4 gap-4 border-b border-b-gray-200  py-2">
              <span className="col-span-1">Ghế</span>
              {selectedSeats.length > 0 ? (
                <ul className="flex flex-wrap mt-1 col-span-3">
                  {selectedSeats.map((seat) => (
                    <li className="mr-2" key={seat._id}>
                      {seat.seatNumber}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="ml-4">Chưa chọn ghế nào</p>
              )}
            </div>
            <div className="grid items-center grid-cols-4 gap-4 border-b border-b-gray-200  py-2">
              <span className="col-span-1">Thông tin cá nhân</span>
              <div className="col-span-3 flex flex-col ">
                <span className="col-span-1">{authState.user?.fullName} </span>
                <span className="col-span-1">{authState.user?.phone} </span>
                <span className="col-span-1">{authState.user?.email} </span>
              </div>
            </div>
            <div>
              <div className="grid items-center grid-cols-4 gap-4 border-b border-b-gray-200  py-2">
                <span className="col-span-1">Hình thức thanh toán</span>
                {idBank === 1 && <div className="col-span-3 flex flex-col ">Thanh toán VN Pay</div>}
                {idBank === 2 && <div className="col-span-3 flex flex-col ">Thanh toán PayPal</div>}
              </div>
            </div>
            <div>
              <div className="grid items-center grid-cols-4 gap-4 border-b border-b-gray-200  py-2">
                <span className="col-span-1">Tổng</span>
                <span className="col-span-3">{totalOrder.toLocaleString()}đ</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center py-4">
            <Button
              onClick={handlePayment}
              title="Tiến hành thanh toán"
              color="error"
              variant="contained"
              className="w-full"
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
