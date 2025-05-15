export interface ITicket {
  _id?: string;
  userId: string;
  cinemaName: string;
  movieName: string;
  caption: string;
  imageMovie: string;
  imageCinema: string;
  codeOrder: string; // Mã vé
  time: string;
  date: string; // Ngày chiếu
  room: string; // Phòng chiếu
  seatNumbers: string; // VD: "A1, A2" (nếu là string)
  snacks: string; // Món ăn kèm
  cinemaAddress: string; // Địa chỉ rạp
  codeTransaction: string; // Mã giao dịch
  urlQrCode: string; // Mã QR
  status?: "PENDING" | "CONFIRMED" | "CANCELLED";
}
