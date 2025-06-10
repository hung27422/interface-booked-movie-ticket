import { useState, useEffect } from "react";
import { useAppContext } from "../contexts/AppContextProvider/AppContextProvider";

const MovieDateSelector = () => {
  const [dates, setDates] = useState<{ date: string; day: string }[]>([]);
  const { selectedDate, setSelectedDate } = useAppContext();

  // Hàm định dạng ngày từ "yyyy-mm-dd" → "dd/mm/yyyy"
  const formatDate = (isoDate: string) => {
    const [year, month, day] = isoDate.split("-");
    return {
      dayMonth: `${day}/${month}`,
      year: `/${year}`,
    };
  };

  useEffect(() => {
    const generateDates = () => {
      const tempDates = [];
      const formatter = new Intl.DateTimeFormat("vi-VN", { weekday: "long" });

      for (let i = 0; i < 6; i++) {
        const date = new Date();
        date.setHours(0, 0, 0, 0); // reset giờ
        date.setDate(date.getDate() + i); // cộng ngày

        // ✅ Sửa chỗ sai múi giờ
        const isoDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(date.getDate()).padStart(2, "0")}`;

        const weekday = formatter.format(date); // thứ (tiếng Việt)

        tempDates.push({
          date: isoDate,
          day: weekday.charAt(0).toUpperCase() + weekday.slice(1), // Viết hoa chữ cái đầu
        });
      }

      setDates(tempDates);
    };

    generateDates();
  }, []);

  return (
    <div>
      <ul className="flex flex-nowrap gap-2">
        {dates.map(({ date, day }) => (
          <li
            key={date}
            className={`p-1 sm:p-2 tech-border rounded cursor-pointer text-center w-16 sm:w-20 2xl:w-24
    ${selectedDate === date ? "bg-purple-600 text-white" : ""} transition duration-200`}
            onClick={() => setSelectedDate(date)}
          >
            <p className="font-medium text-[8px] sm:text-sm 2xl:text-base leading-tight">{day}</p>
            <p className="text-[10px] sm:text-xs 2xl:text-sm">
              {formatDate(date).dayMonth}
              <span className="hidden sm:inline">{formatDate(date).year}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDateSelector;
