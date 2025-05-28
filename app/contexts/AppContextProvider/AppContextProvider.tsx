import { Snack } from "@/app/types/Booking";
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
  totalPriceSnack: number;
  setTotalPriceSnack: React.Dispatch<React.SetStateAction<number>>;
  selectedSnacks: Snack[];
  setSelectedSnacks: React.Dispatch<React.SetStateAction<Snack[]>>;
  idBank: number;
  setIdBank: React.Dispatch<React.SetStateAction<number>>;
  toggleMenuProfile: number;
  setToggleMenuProfile: React.Dispatch<React.SetStateAction<number>>;
  openModalAuth: boolean;
  setOpenModalAuth: React.Dispatch<React.SetStateAction<boolean>>;
  saveErrorCinemasByMovieId: null | string;
  setSaveErrorCinemasByMovieId: React.Dispatch<React.SetStateAction<null | string>>;
  selectedAutoCompletedAddress: string;
  setSelectedAutoCompletedAddress: React.Dispatch<React.SetStateAction<string>>;
  // Bạn có thể thêm nhiều biến khác ở đây trong tương lai
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Tạo state để lưu trữ địa chỉ đã chọn
  const [selectedAddress, setSelectedAddress] = useState("Hồ Chí Minh");
  const [selectedAutoCompletedAddress, setSelectedAutoCompletedAddress] = useState("Hồ Chí Minh");
  // Tạo state để lưu trữ rạp đã chọn
  const [cinemaIDSelected, setCinemaIDSelected] = useState<string>("67b7575dba9c7545a6904d31");
  // Tạo state để lưu trữ ngày đã chọn
  const [selectedDate, setSelectedDate] = useState<string>(getTodayVN());
  // Tạo state để lưu trữ danh sách ghế đã chọn
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  // Tạo state để lưu trữ các bước đặt vé
  const [stepBooking, setStepBooking] = useState<number>(0);
  // Tạo state để lưu trữ id booking
  const [idBooking, setIdBooking] = useState<string>("");
  // Tạo state để lưu trữ giá của Snack
  const [totalPriceSnack, setTotalPriceSnack] = useState(0);
  // Tạo state để lưu trữ danh sách đồ ăn đã chọn
  const [selectedSnacks, setSelectedSnacks] = useState<Snack[]>([]);
  // Tạo state để lưu trữ bank đã chọn
  const [idBank, setIdBank] = useState<number>(1);
  // Tạo state để lưu trữ menu profile đã chọn
  const [toggleMenuProfile, setToggleMenuProfile] = useState<number>(1);
  // Tạo state để mở modal đăng nhập
  const [openModalAuth, setOpenModalAuth] = useState<boolean>(false);
  //
  const [saveErrorCinemasByMovieId, setSaveErrorCinemasByMovieId] = useState<null | string>(null);

  const appContextValue = {
    selectedAddress,
    setSelectedAddress,
    selectedAutoCompletedAddress,
    setSelectedAutoCompletedAddress,
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
    totalPriceSnack,
    setTotalPriceSnack,
    selectedSnacks,
    setSelectedSnacks,
    idBank,
    setIdBank,
    toggleMenuProfile,
    setToggleMenuProfile,
    openModalAuth,
    setOpenModalAuth,
    saveErrorCinemasByMovieId,
    setSaveErrorCinemasByMovieId,
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
