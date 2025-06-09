export const apiURL =
  process.env.NODE_ENV === "production"
    ? "https://backend-booked-movie-ticket.onrender.com/api" // Cập nhật đúng URL API thật
    : "http://localhost:5000/api"; // Nếu API chạy local

export const LOCAL_STORAGE_TOKEN_NAME = "token-user";
