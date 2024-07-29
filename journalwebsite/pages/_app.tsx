import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Plus_Jakarta_Sans} from "next/font/google";
const font = Plus_Jakarta_Sans({ subsets: ['latin'] });
export default function App({ Component, pageProps }: AppProps) {
  return<><style jsx global>{`
    html {
      font-family: ${font.style.fontFamily};
    }
  `}</style><Component {...pageProps} className = {font.className}  /> </> ;
}
