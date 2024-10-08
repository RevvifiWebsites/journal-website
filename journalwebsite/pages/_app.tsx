import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Plus_Jakarta_Sans} from "next/font/google";
const font = Plus_Jakarta_Sans({ subsets: ['latin'] });
import type { NextPageContext } from 'next';
import { useEffect, useState } from "react";
import russianLocale from "@/lib/locale";

export default function App({ Component, pageProps }: AppProps) {
  const [russian, setRussian] = useState(false);
  useEffect(() => {
    setRussian(russianLocale.russianLocale());
  }, []);
  return<><style jsx global>{`
    html {
      font-family: ${font.style.fontFamily};
    }
  `}</style><Component {...pageProps} rus = {russian} className = {font.className}  /> </> ;
}
