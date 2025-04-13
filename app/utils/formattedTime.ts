// utils/formattedTime.ts

interface FormattedTimeProps {
  isoString: string;
  type?: "date" | "time" | "hour";
}

const FormattedTime = ({ isoString, type = "date" }: FormattedTimeProps): string => {
  const dateObj = new Date(isoString);

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();

  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");

  const date = `${day}/${month}/${year}`;
  const time = `${hours}:${minutes}`;

  if (type === "date") return date;
  if (type === "time") return time;
  if (type === "hour") return hours;

  return "";
};

export default FormattedTime;
