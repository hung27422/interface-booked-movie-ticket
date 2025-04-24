interface ICinema {
  _id: string; // ID MongoDB
  name?: string; // Tên rạp chiếu phim
}
export interface ISnack {
  _id?: string; // ID MongoDB (tùy chọn khi tạo mới)
  name: string; // Tên bắp nước
  price: number; // Giá bán
  description?: string; // Mô tả chi tiết (tùy chọn)
  cinemaId: ICinema; // ID rạp chiếu phim
  createdAt?: string; // Thời gian tạo (ISO format)
  updatedAt?: string; // Thời gian cập nhật (ISO format)
}
