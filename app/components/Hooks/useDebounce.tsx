import { useEffect, useState } from "react";

/**
 * Hook debounce một giá trị đầu vào.
 * @param value Giá trị cần debounce
 * @param delay Độ trễ (ms), mặc định 500ms
 * @returns Giá trị đã debounce
 */
function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
