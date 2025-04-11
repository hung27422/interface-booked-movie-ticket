export interface ICinemas {
  _id?: string;
  name: string;
  image: string;
  location: string;
  cinemaCode: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}
//
export interface CinemaItem {
  _id: string;
  name: string;
  location: string;
  phone: string;
  rooms: string[]; // Mảng ID của các phòng chiếu
  createdAt: string;
  updatedAt: string;
  __v: number;
  cinemaCode: string;
  image: string;
}

export interface GroupedCinema {
  cinemaCode: string;
  count: number;
  name: string;
  image: string;
  items: CinemaItem[];
}

export interface IGroupedByLocation {
  address: string;
  total: number;
  cinemas: GroupedCinema[];
}
