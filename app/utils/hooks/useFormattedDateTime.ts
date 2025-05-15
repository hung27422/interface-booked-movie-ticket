import { useMemo } from "react";

const useFormattedDateTime = (raw: string): string => {
  const formatted = useMemo(() => {
    if (!/^\d{14}$/.test(raw)) return "";

    const year = raw.slice(0, 4);
    const month = raw.slice(4, 6);
    const day = raw.slice(6, 8);
    const hour = raw.slice(8, 10);
    const minute = raw.slice(10, 12);

    return `${hour}:${minute} - ${day}/${month}/${year}`;
  }, [raw]);

  return formatted;
};

export default useFormattedDateTime;
