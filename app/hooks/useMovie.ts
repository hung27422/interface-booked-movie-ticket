import useSWR from "swr";
import { IMovie } from "../types/Movie";

interface UseSnackProps {
  status?: string;
  idMovie?: string;
}

function useMovie({ status, idMovie }: UseSnackProps = {}) {
  const { data: dataMovieById } = useSWR<IMovie>(idMovie ? `/movies/${idMovie}` : null);
  // Lấy movies theo status
  const { data: dataMoviesByStatus } = useSWR<IMovie[]>(
    status && `/movies/status?status=${status}`
  );
  // Lấy movies theo tháng hiện tại
  const { data: dataMoviesByThisMonth } = useSWR<IMovie[]>(`/movies/this-month`);

  return {
    dataMoviesByStatus,
    dataMovieById,
    dataMoviesByThisMonth,
  };
}

export default useMovie;
