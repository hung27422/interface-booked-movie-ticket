import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import useTicket from "@/app/hooks/useTicket";
import Image from "next/image";
import Base64Image from "../Base64Image";
import { useContext } from "react";
import { AuthContext } from "@/app/contexts/AuthContextProvider/AuthContextProvider";
import useHandleDownloadPDF from "@/app/utils/hooks/useHandleDownloadPDF";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #ff00ff",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  boxShadow: 24,
  p: 4,
  overflowY: "scroll",
  maxHeight: "80vh",
  scrollbarWidth: "none",
  borderRadius: 4,
};
interface ModalInfoTicketProps {
  idTicket?: string;
}
export default function ModalInfoTicket({ idTicket }: ModalInfoTicketProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const ticketRef = React.useRef<HTMLDivElement>(null);
  // context
  const { authState } = useContext(AuthContext);
  // hooks
  const { dataTicketByID: data } = useTicket({ idTicket: idTicket });
  const { handleDownloadPDF } = useHandleDownloadPDF({ ticketRef });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Button onClick={handleOpen}>Xem chi tiết</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            ref={ticketRef}
            className="flex flex-col max-w-[620px] bg-gray-700 mx-auto border-white border-2 rounded-lg px-4 py-2 text-white"
          >
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

              <Base64Image base64={data.urlQrCode} />
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
          <div className="flex items-center justify-center gap-4 mt-4">
            <Button onClick={handleDownloadPDF} color="secondary" variant="contained">
              Lưu vé (PDF)
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
