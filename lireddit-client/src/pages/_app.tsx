import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { Provider, createClient } from "urql";
const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    //  for cookies
    credentials: "include",
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
