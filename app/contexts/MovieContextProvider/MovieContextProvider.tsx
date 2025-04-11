"use client";
import { createContext, useReducer, ReactNode, useEffect } from "react";
import movieReducer, { MovieState } from "@/app/reducer/movieReducer";
import useSWR from "swr";
import { IMovie } from "@/app/types/Movie";

const initialState: MovieState = {
  movies: null,
};
interface MovieContextTypes {
  movieState: MovieState;
}

const defaultValue: MovieContextTypes = {
  movieState: {
    movies: null,
  },
};

// Tạo Context
export const MovieContext = createContext<MovieContextTypes>(defaultValue);

export const MovieContextProvider = ({ children }: { children: ReactNode }) => {
  const [movieState, dispatch] = useReducer(movieReducer, initialState);

  // Get data movie
  const { data: dataMovie, error } = useSWR<IMovie[]>("/movies");

  // useEffect
  useEffect(() => {
    if (dataMovie) {
      dispatch({ type: "GET_MOVIES", payload: { movies: dataMovie } });
    }
  }, [dataMovie]);

  if (error) {
    console.error(error);
  }

  const movieContextValue = { movieState };

  return <MovieContext.Provider value={movieContextValue}>{children}</MovieContext.Provider>;
};
