export interface SnackItem {
  snackId: string; // ID của món ăn (snack)
  quantity: number; // Số lượng món ăn
  price: number; // Giá của món ăn
  subtotal: number; // Tổng tiền cho món ăn (quantity * price)
}

export interface IBooking {
  _id?: string; // ID của booking, có thể không có khi mới tạo
  userId: string; // ID của người dùng
  showtimeId: string; // ID của suất chiếu
  seatNumbers: string[]; // Mảng chứa các số ghế đã chọn
  snacks: SnackItem[]; // Mảng chứa các món ăn đã chọn
  ticketPrice: number; // Giá vé của một ghế
  totalPrice: number; // Tổng giá tiền của booking (vé + snack)
  status: "PENDING" | "CONFIRMED" | "CANCELLED"; // Trạng thái của booking
  createdAt?: string; // Thời gian tạo booking (dạng chuỗi ISO 8601)
  updatedAt?: string; // Thời gian cập nhật booking (dạng chuỗi ISO 8601)
}
