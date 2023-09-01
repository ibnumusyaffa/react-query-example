import { getProfile } from "../services/profile";
import { useQuery } from "react-query";
import useStore from "../store";
export default function useProfile() {
  const isReady = useStore((state) => state.isReady);
  return useQuery(
    //query key
    ["profile"],

    () => getProfile(),

    {
      enabled: isReady,
      select: (response) => response.data,
    }
  );
}
