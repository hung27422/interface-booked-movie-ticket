import useSWR from "swr";
import { ICinemas, IGroupedByLocation } from "../types/Cinemas";

interface useCinemasProps {
  name?: string;
  location?: string;
  idCinema?: string;
}
function useCinemas({ name, location, idCinema }: useCinemasProps = {}) {
  const { data: cinemas, error, mutate } = useSWR<ICinemas[]>("/cinemas");

  const { data: getCinemaByID } = useSWR<ICinemas>(idCinema ? `/cinemas/${idCinema}` : null);
  const { data: dataCinemaByName } = useSWR<ICinemas[]>(
    name || name !== undefined ? `/cinemas/search?name=${name}` : null
  );
  const { data: dataCinemaByLocation } = useSWR<IGroupedByLocation[]>(
    location ? `/cinemas/group-by-location?location=${location}` : null
  );

  return { cinemas, getCinemaByID, dataCinemaByName, dataCinemaByLocation, error, mutate };
}

export default useCinemas;
