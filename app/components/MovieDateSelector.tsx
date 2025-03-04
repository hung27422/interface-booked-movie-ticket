import { useState, useEffect } from "react";

const MovieDateSelector = () => {
  const [dates, setDates] = useState<{ date: string; day: string }[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

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
      <ul className="flex space-x-2">
        {dates.map(({ date, day }) => (
          <li
            key={date}
            className={`p-2 tech-border rounded cursor-pointer text-center w-24  ${
              selectedDate === date && "bg-purple-600"
            }`}
            onClick={() => setSelectedDate(date)}
          >
            <p className="font-bold text-sm">{day}</p>
            <p>{date.split("-").reverse().join("/")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDateSelector;
