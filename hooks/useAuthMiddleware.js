import useStore from "../store";
import { useRouter } from "next/router";
import { useEffect } from "react";
function useAuthMiddleware() {
  let router = useRouter();
  let isAuthenticated = useStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
}
export default useAuthMiddleware;
