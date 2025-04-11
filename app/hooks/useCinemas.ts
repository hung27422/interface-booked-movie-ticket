import useSWR from "swr";
import { ICinemas, IGroupedByLocation } from "../types/Cinemas";

interface useCinemasProps {
  name?: string;
  location?: string;
}
function useCinemas({ name, location }: useCinemasProps = {}) {
  const { data: cinemas, error, mutate } = useSWR<ICinemas[]>("/cinemas");
  const { data: dataCinemaByName } = useSWR<ICinemas[]>(`/cinemas/search?name=${name}`);
  const { data: dataCinemaByLocation } = useSWR<IGroupedByLocation[]>(
    `/cinemas/group-by-location?location=${location}`
  );

  return { cinemas, dataCinemaByName, dataCinemaByLocation, error, mutate };
}

export default useCinemas;
