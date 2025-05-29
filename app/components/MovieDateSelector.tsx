import { useState, useEffect } from "react";
import { useAppContext } from "../contexts/AppContextProvider/AppContextProvider";

const MovieDateSelector = () => {
  const [dates, setDates] = useState<{ date: string; day: string }[]>([]);
  const { selectedDate, setSelectedDate } = useAppContext();

  useEffect(() => {
    const generateDates = () => {
      const tempDates = [];
      const today = new Date();
      const formatter = new Intl.DateTimeFormat("vi-VN", { weekday: "long" });

      for (let i = 0; i < 6; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        tempDates.push({
          date: date.toISOString().split("T")[0], // yyyy-mm-dd
          day: formatter.format(date), // Thứ (thứ Hai, thứ Ba, ...)
        });
      }
      setDates(tempDates);
    };

    generateDates();
  }, []);

  return (
    <div>
      <ul className="flex flex-wrap gap-2">
        {dates.map(({ date, day }) => (
          <li
            key={date}
            className={`p-1 tech-border rounded cursor-pointer text-center w-16 sm:w-20 2xl:w-24
              ${selectedDate === date ? "bg-purple-600 text-white" : ""} transition duration-200`}
            onClick={() => setSelectedDate(date)}
          >
            <p className="font-medium text-[10px] sm:text-sm 2xl:text-base">{day}</p>
            <p className="text-[10px] sm:text-xs 2xl:text-sm">
              {date.split("-").reverse().join("/")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDateSelector;
