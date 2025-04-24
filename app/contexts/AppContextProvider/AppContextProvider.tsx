import { Seat } from "@/app/types/Rooms";
import React, { createContext, useContext, useState } from "react";

type AppContextType = {
  selectedAddress: string;
  setSelectedAddress: (value: string) => void;
  cinemaIDSelected: string;
  setCinemaIDSelected: (value: string) => void;
  selectedDate: string;
  setSelectedDate: (value: string) => void;
  selectedSeats: Seat[];
  setSelectedSeats: React.Dispatch<React.SetStateAction<Seat[]>>;
  stepBooking: number;
  setStepBooking: React.Dispatch<React.SetStateAction<number>>;
  idBooking: string;
  setIdBooking: React.Dispatch<React.SetStateAction<string>>;
  // Bạn có thể thêm nhiều biến khác ở đây trong tương lai
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Tạo state để lưu trữ địa chỉ đã chọn
  const [selectedAddress, setSelectedAddress] = useState("Hồ Chí Minh");
  // Tạo state để lưu trữ rạp đã chọn
  const [cinemaIDSelected, setCinemaIDSelected] = useState<string>("");
  // Tạo state để lưu trữ ngày đã chọn
  const [selectedDate, setSelectedDate] = useState<string>(getTodayVN());
  // Tạo state để lưu trữ danh sách ghế đã chọn
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  // Tạo state để lưu trữ các bước đặt vé
  const [stepBooking, setStepBooking] = useState<number>(0);
  // Tạo state để lưu trữ id booking
  const [idBooking, setIdBooking] = useState<string>("");
  const appContextValue = {
    selectedAddress,
    setSelectedAddress,
    cinemaIDSelected,
    setCinemaIDSelected,
    selectedDate,
    setSelectedDate,
    selectedSeats,
    setSelectedSeats,
    stepBooking,
    setStepBooking,
    idBooking,
    setIdBooking,
  };
  return <AppContext.Provider value={appContextValue}>{children}</AppContext.Provider>;
};
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
const getTodayVN = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${year}-${month}-${day}`;
};
