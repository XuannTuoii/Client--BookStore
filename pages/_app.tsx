import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer style={{ fontSize: "1.6rem" }} />
    </>
  );
}
