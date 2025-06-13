import useSWR from "swr";
import { IMovie } from "../types/Movie";

interface UseSnackProps {
  status?: string;
  idMovie?: string;
}

function useMovie({ status, idMovie }: UseSnackProps = {}) {
  const { data: dataMovies, isLoading: isLoadingAllMovie } = useSWR<IMovie[]>(`/movies/getAll`);

  const { data: dataMovieById } = useSWR<IMovie>(idMovie ? `/movies/${idMovie}` : null);
  // Lấy movies theo status
  const { data: dataMoviesByStatus, isLoading: isLoadingMovieByStatus } = useSWR<IMovie[]>(
    status && `/movies/status?status=${status}`
  );
  // Lấy movie
  // Lấy movies theo tháng hiện tại
  const { data: dataMoviesByThisMonth } = useSWR<IMovie[]>(`/movies/this-month`);

  return {
    dataMoviesByStatus,
    dataMovieById,
    isLoadingMovieByStatus,
    dataMoviesByThisMonth,
    dataMovies,
    isLoadingAllMovie,
  };
}

export default useMovie;
