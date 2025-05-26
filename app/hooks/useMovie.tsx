import useSWR from "swr";
import { IMovie } from "../types/Movie";

interface UseSnackProps {
  status?: string;
}

function useMovie({ status }: UseSnackProps = {}) {
  // Lấy movies theo
  const { data: dataMoviesByStatus } = useSWR<IMovie[]>(
    status && `/movies/status?status=${status}`
  );
  const { data: dataMoviesByThisMonth } = useSWR<IMovie[]>(`/movies/this-month`);
  return {
    dataMoviesByStatus,
    dataMoviesByThisMonth,
  };
}

export default useMovie;
