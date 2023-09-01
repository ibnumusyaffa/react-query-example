import "../styles/tailwind.css";
import "../styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Head from "next/head";
import { syncToken } from "../services/axios";
import useStore from "../store";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        fontFamily: null,
        color: null,
        bg: null,
        lineHeight: null,
        "*::placeholder": null,
        "*, *::before, &::after": {
          borderColor: null,
          wordWrap: null,
        },
        fontFeatureSettings: null,
      },
    }),
  },
});

function MyApp({ Component, pageProps }) {
  const setIsAuthenticated = useStore((state) => state.setIsAuthenticated);
  const setIsReady = useStore((state) => state.setIsReady);
  const isReady = useStore((state) => state.isReady);
  useEffect(() => {
    if (!Cookies.get("is_authenticated")) {
      setIsAuthenticated(false);
    }

    setIsReady(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (Cookies.get("is_authenticated")) {
    syncToken();
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>PDKI Dashboard</title>
      </Head>
 
      <ChakraProvider resetCSS={false} theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
