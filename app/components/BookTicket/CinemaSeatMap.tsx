import { useAppContext } from "@/app/contexts/AppContextProvider/AppContextProvider";
import { IRoom, Seat } from "@/app/types/Rooms";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import useSnackbar from "../Hooks/useSnackbar";

interface CinemaSeatMapProps {
  dataRoom: IRoom;
}

function CinemaSeatMap({ dataRoom }: CinemaSeatMapProps) {
  // context
  const { selectedSeats, setSelectedSeats } = useAppContext();

  //hooks
  const { showSnackbar } = useSnackbar();
  const toggleSeatSelection = (seat: Seat, secondSeat?: Seat) => {
    const seatIds = secondSeat ? [seat._id, secondSeat._id] : [seat._id];
    const areSeatsSelected = seatIds.every((id) => selectedSeats.some((s) => s._id === id));

    if (!areSeatsSelected && selectedSeats.length + seatIds.length > 10) {
      showSnackbar("Một người chỉ được đặt tối đa 10 ghế", "error");
      return;
    }

    setSelectedSeats((prev: Seat[]) => {
      if (areSeatsSelected) {
        // Bỏ chọn cả hai ghế
        return prev.filter((s) => !seatIds.includes(s._id));
      } else {
        // Chọn cả hai ghế
        const newSeats = [seat, ...(secondSeat ? [secondSeat] : [])];
        return [...prev, ...newSeats];
      }
    });
  };

  const groupedSeats = dataRoom.seats?.reduce((acc, seat) => {
    if (!seat.position || typeof seat.position.row === "undefined") return acc;
    const rowKey = seat.position.row.toString();
    if (!acc[rowKey]) acc[rowKey] = [];
    acc[rowKey].push(seat);
    return acc;
  }, {} as Record<string, typeof dataRoom.seats>);

  return (
    <div className="w-full max-w-screen-md mx-auto px-2 ">
      {/* Ghi chú ghế */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-sm sm:text-base md:text-lg mt-4">
        <div className="flex items-center gap-2">
          <div className="size-6 sm:size-8 tech-border tech-border-focused flex items-center justify-center" />
          <span>Ghế bạn chọn</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="size-6 sm:size-8 flex items-center justify-center tech-border bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none">
            <CloseIcon fontSize="small" />
          </div>
          <span>Không thể chọn</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="size-6 sm:size-8 flex items-center justify-center tech-border bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none">
            <CheckIcon fontSize="small" />
          </div>
          <span>Đã bán</span>
        </div>
      </div>

      {/* Màn hình */}
      <div className="flex items-center justify-center tech-border tech-border-focused mt-4 py-1 w-full sm:w-[80%] md:w-[60%] mx-auto">
        <span className="text-base sm:text-lg md:text-xl font-semibold">Màn Hình</span>
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
              const isEitherBooked = seat.isBooked || seats[i + 1]?.isBooked;

              if (isEitherBooked) {
                seatRow.push(
                  <div
                    key={seat._id}
                    className="min-w-[4rem] w-1/5 sm:w-16 h-8 mr-2 sm:mr-3 flex items-center justify-center tech-border bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
                  >
                    <CheckIcon fontSize="small" />
                  </div>
                );
                i++;
                continue;
              }
              seatRow.push(
                <div
                  onClick={() => toggleSeatSelection(seat, seats[i])}
                  key={seat._id}
                  className={`min-w-[4rem] w-1/5 sm:w-16 h-8 mr-2 sm:mr-3 flex items-center justify-center rounded-md text-white font-bold hover:cursor-pointer
              ${isSelected ? "tech-border tech-border-focused" : "bg-blue-500"}
            `}
                >
                  {seat?.seatNumber} - {seats[i + 1]?.seatNumber}
                </div>
              );
              i++; // Bỏ qua ghế tiếp theo vì đã gộp
            } else {
              const isSelected = selectedSeats.some((s) => s._id === seat._id);
              if (seat.isBooked === true) {
                seatRow.push(
                  <div
                    key={seat._id}
                    className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center tech-border bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none  ${
                      seat.type === "AISLE" ? "mr-4 sm:mr-6" : ""
                    }
              `}
                  >
                    <CheckIcon fontSize="small" />
                  </div>
                );
                continue; // bỏ qua đoạn render thường
              }
              seatRow.push(
                <div
                  onClick={() => toggleSeatSelection(seat)}
                  key={seat._id}
                  className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md text-white font-bold tech-border hover:cursor-pointer 
              ${seat.type === "AISLE" ? "mr-4 sm:mr-6" : ""}
              ${isSelected ? "tech-border-focused" : "bg-gray-500"}
            `}
                >
                  {seat?.seatNumber}
                </div>
              );
            }
          }

          return (
            <div key={row} className="flex gap-1 md:gap-2 text-sm">
              {seatRow}
            </div>
          );
        })}
      </div>

      {/* Ghi chú loại ghế */}
      <div className="flex items-center justify-center gap-4 mt-6 flex-wrap text-sm sm:text-base">
        <div className="flex items-center gap-2">
          <div className="size-5 sm:size-6 bg-gray-500 rounded-sm" />
          <p>Ghế đơn</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-5 sm:size-6 bg-blue-500 rounded-sm" />
          <p>Ghế đôi</p>
        </div>
      </div>
    </div>
  );
}

export default CinemaSeatMap;
