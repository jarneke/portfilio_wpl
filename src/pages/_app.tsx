import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/styles/global.css";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
}
