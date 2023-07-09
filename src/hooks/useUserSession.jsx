import { useEffect, useState } from "react";
import { checkSession } from "../fetchers/userFetcher";

function useUserSession() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const res = await checkSession();
        if (res) {
          setIsLoggedIn(true);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  return { isLoggedIn, isLoading, setIsLoggedIn };
}

export default useUserSession;