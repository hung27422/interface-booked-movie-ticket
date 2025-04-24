import useSWR from "swr";
import { ISnack } from "../types/Snack";

interface UseSnackProps {
  cinemaId?: string;
  name?: string;
}

function useSnacks({ name, cinemaId }: UseSnackProps = {}) {
  // Lấy tất cả snacks theo cinemaId
  const { data: snacks, error } = useSWR<ISnack[]>("/snacks");

  // Lấy snacks theo tên (search)
  const { data: dataSnackByName } = useSWR<ISnack[]>(name && `/snacks/search?name=${name}`);

  // Lấy snacks theo cinemaId
  const { data: dataSnacksByCinema } = useSWR<ISnack[]>(cinemaId && `/snacks/${cinemaId}`);

  return {
    snacks,
    dataSnackByName,
    dataSnacksByCinema,
    error,
  };
}

export default useSnacks;
