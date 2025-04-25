export interface Snack {
  snackId: string; // ID của món ăn (snack)
  quantity: number; // Số lượng món ăn
  price: number; // Giá của món ăn
  subtotal: number; // Tổng tiền cho món ăn (quantity * price)
}

export interface IBookingData {
  _id?: string; // ID của booking, có thể không có khi mới tạo
  userId: string; // ID của người dùng
  showtimeId: string; // ID của suất chiếu
  seatNumbers: string[]; // Mảng chứa các số ghế đã chọn
  snacks: Snack[]; // Mảng chứa các món ăn đã chọn
  ticketPrice: number; // Giá vé của một ghế
  totalPrice?: number; // Tổng giá tiền của booking (vé + snack)
  status: "PENDING" | "CONFIRMED" | "CANCELLED"; // Trạng thái của booking
  createdAt?: string; // Thời gian tạo booking (dạng chuỗi ISO 8601)
  updatedAt?: string; // Thời gian cập nhật booking (dạng chuỗi ISO 8601)
}

/// Type Booking By Id //////
export interface IUser {
  _id: string;
  username: string;
  email: string;
}

export interface ISeatPricing {
  SINGLE: number;
  DOUBLE: number;
}

export interface IShowtime {
  _id: string;
  movieId: string;
  cinemaId: string;
  roomId: string;
  startTime: string;
  endTime: string;
  price: number;
  availableSeats: number;
  seatPricing: ISeatPricing;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ISnackItem {
  _id: string;
  name: string;
  description: string;
  type: string;
  price: number;
  isAvailable: boolean;
  cinemaId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IBookingSnack {
  _id: string;
  snackId: ISnackItem;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface IBooking {
  _id: string;
  userId: IUser;
  showtimeId: IShowtime;
  seatNumbers: string[];
  snacks: IBookingSnack[];
  ticketPrice: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
