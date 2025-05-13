interface IMovie {
  _id: string;
  title: string;
  caption: string;
}

interface IRoom {
  _id: string;
  name: string;
}
interface ICinemas {
  _id: string;
  name: string;
}
interface ISeatPricing {
  SINGLE: number;
  DOUBLE: number;
}
export interface IShowTime {
  _id?: string;
  movieId: string;
  cinemaId: string;
  roomId: string;
  movie?: IMovie;
  room?: IRoom;
  cinema?: ICinemas;
  startTime: string;
  endTime: string;
  price: number;
  availableSeats: number;
  seatPricing: ISeatPricing;
  createdAt?: string;
  updatedAt?: string;
}
/// ========================== "filter-by-cinema-date"========================= ///
export interface IShowtimeByCinemaDate {
  cinema: ICinemaByCinemaDate;
  data: DataByCinemaDate[];
}
export interface DataByCinemaDate {
  _id: string;
  movie: IMovieByCinemaDate;
  showtimes: IShowtimeByCinemaDate[];
}
export interface IMovieByCinemaDate {
  _id: string;
  title: string;
  description: string;
  duration: number;
  genre: string[];
  releaseDate: string;
  director: string;
  cast: string[];
  poster: string;
  trailer: string;
  rating: number;
  ageRate: number;
  country: string;
  caption: string;
  status: "COMINGSOON" | "NOWSHOWING" | "STOPSHOWING";
  numberMovieScreening: number;
  movieScreenings: string[];
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICinemaByCinemaDate {
  _id: string;
  name: string;
  location: string;
}

export interface IShowtimeByCinemaDate {
  _id: string;
  room: IRoom;
  startTime: string;
  endTime: string;
  price: number;
  availableSeats: number;
}

export interface IRoomByCinemaDate {
  _id: string;
  name: string;
}
