const showTimes = [
  "09:00",
  "10:00",
  "11:15",
  "11:40",
  "12:20",
  "13:30",
  "14:00",
  "14:40",
  "15:45",
  "16:20",
  "17:00",
  "18:00",
  "18:40",
  "19:20",
  "20:15",
  "21:00",
  "21:40",
  "22:30",
];

const disabledTimes = ["09:00", "10:00", "11:15", "11:40", "12:20"];

const MovieShowTimes = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {showTimes.map((time) => {
        const isDisabled = disabledTimes.includes(time);
        return (
          <button
            key={time}
            disabled={isDisabled}
            className={`p-3 tech-border rounded text-sm w-16 h-10 flex flex-col justify-center items-center 
              ${isDisabled ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "tech-border"} 
              `}
          >
            <span className="font-bold">{time}</span>
            <span className="text-gray-500 text-xs">88K</span>
          </button>
        );
      })}
    </div>
  );
};

export default MovieShowTimes;
