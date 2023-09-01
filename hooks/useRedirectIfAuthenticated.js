import useStore from "../store";
import { useRouter } from "next/router";
import { useEffect } from "react";
function useRedirectIfAuthenticated() {
  let router = useRouter();
  let isAuthenticated = useStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/merek/detail");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
}
export default useRedirectIfAuthenticated;
