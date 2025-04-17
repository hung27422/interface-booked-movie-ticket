import { useAppContext } from "@/app/contexts/AppContextProvider/AppContextProvider";
import { IRoom, Seat } from "@/app/types/Rooms";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import useSnackbar from "../Hooks/useSnackbar";
interface CinemaSeatMapProps {
  dataRoom: IRoom;
}
function CinemaSeatMap({ dataRoom }: CinemaSeatMapProps) {
  //context
  const { selectedSeats, setSelectedSeats } = useAppContext();
  console.log({ selectedSeats });
  // hooks
  const { showSnackbar } = useSnackbar();
  // function
  const toggleSeatSelection = (seat: Seat) => {
    // Kiểm tra nếu số ghế đã chọn >= 10 và ghế chưa được chọn
    const isSeatSelected = selectedSeats.some((s) => s._id === seat._id);
    if (selectedSeats.length >= 10 && !isSeatSelected) {
      // Nếu số ghế đã chọn >= 10 và ghế chưa được chọn, không cho chọn thêm
      showSnackbar("Một người chỉ được đặt tối đa 10 ghế", "error");
      return;
    }

    // Cập nhật danh sách ghế đã chọn
    setSelectedSeats((prev: Seat[]) => {
      if (isSeatSelected) {
        // Nếu ghế đã được chọn, bỏ chọn nó (hủy chọn)
        return prev.filter((s) => s._id !== seat._id);
      } else {
        // Nếu ghế chưa được chọn, thêm nó vào danh sách đã chọn
        return [...prev, seat];
      }
    });
  };

  const groupedSeats = dataRoom.seats?.reduce((acc, seat) => {
    if (!seat.position || typeof seat.position.row === "undefined") return acc; // Kiểm tra tránh lỗi
    const rowKey = seat.position.row.toString(); // Nhóm theo số hàng
    if (!acc[rowKey]) acc[rowKey] = [];
    acc[rowKey].push(seat);
    return acc;
  }, {} as Record<string, typeof dataRoom.seats>);

  // useEffect
  useEffect(() => {
    if (selectedSeats.length > 10) {
      showSnackbar("Một người chỉ được đặt tối đa 10 ghế", "error");
      return;
    }
  }, [selectedSeats.length, showSnackbar]);
  return (
    <div>
      {/* Ghi chú ghế */}
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center">
          <div className="size-8 tech-border tech-border-focused flex items-center justify-center "></div>
          <span className="text-lg ml-2">Ghế bạn chọn</span>
        </div>

        <div className="flex items-center">
          <div className="size-8 flex items-center justify-center tech-border bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none">
            <CloseIcon />
          </div>
          <span className="text-lg ml-2">Không thể chọn</span>
        </div>

        <div className="flex items-center">
          <div className="size-8 flex items-center justify-center tech-border bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none">
            <CheckIcon />
          </div>
          <span className="text-lg ml-2">Đã bán</span>
        </div>
      </div>

      {/* Màn hình */}
      <div className="flex items-center justify-center tech-border tech-border-focused mt-4 py-1 w-[60%] mx-auto">
        <span className="text-xl ">Màn Hình</span>
      </div>

      {/* Ghế */}
      <div className="mt-4 space-y-2 flex flex-col items-center p-2">
        {Object.entries(groupedSeats || {}).map(([row, seats]) => {
          const seatRow: React.ReactNode[] = [];
          for (let i = 0; i < seats.length; i++) {
            const seat = seats[i];

            if (seat.type === "DOUBLE") {
              const isSelected = selectedSeats.some(
                (s) => s._id === seat._id || s._id === seats[i + 1]?._id
              );

              seatRow.push(
                <div
                  onClick={() => toggleSeatSelection(seat)}
                  key={seat._id}
                  className={`w-16 mr-3 h-8 flex items-center justify-center rounded-md text-white font-bold
                    ${isSelected ? "tech-border tech-border-focused" : "bg-blue-500"}
                  `}
                >
                  {seat?.seatNumber} - {seats[i + 1]?.seatNumber}
                </div>
              );
              i++; // Bỏ qua ghế tiếp theo vì đã gộp
            } else {
              const isSelected = selectedSeats.some((s) => s._id === seat._id);

              seatRow.push(
                <div
                  onClick={() => toggleSeatSelection(seat)}
                  key={seat._id}
                  className={`w-8 h-8 flex items-center justify-center rounded-md text-white font-bold tech-border hover:cursor-pointer
                    ${seat.type === "AISLE" ? "mr-6" : ""}
                    ${isSelected ? "tech-border-focused " : "bg-gray-500"}
                  `}
                >
                  {seat?.seatNumber}
                </div>
              );
            }
          }

          return (
            <div key={row} className="flex gap-2">
              {seatRow}
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-4 mt-5">
        <div className="flex items-center gap-2">
          <div className="size-6 bg-gray-500"></div>
          <p>Ghế đơn</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-6 bg-blue-500"></div>
          <p>Ghế đôi</p>
        </div>
      </div>
    </div>
  );
}

export default CinemaSeatMap;
