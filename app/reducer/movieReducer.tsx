"use client";

import { IMovie } from "../types/Movie";

export interface MovieState {
  movies: IMovie[] | null;
}

type MovieAction = { type: "GET_MOVIES"; payload: MovieState };

// Reducer để xử lý hành động
export const movieReducer = (state: MovieState, action: MovieAction): MovieState => {
  switch (action.type) {
    case "GET_MOVIES":
      return {
        ...state,
        movies: action.payload.movies,
      };

    default:
      return state;
  }
};

export default movieReducer;
