import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`relative flex min-h-screen flex-col items-center justify-between ${inter.className}`}
    >
      <div className="absolute flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <div className=" dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"></div>
      </div>
      <Component {...pageProps} />
      <div className="absolute top-1/2 left-1/4 flex place-items-center after:absolute after:h-[200px] after:w-full sm:after:w-[580px] after:-translate-x-1/2 after:rounded-full after:bg-gradient-radial after:from-transparent after:to-white after:blur-2xl after:content-[''] before:-z-20 before:h-[120px] before:w-full sm:before:w-[220px] before:-translate-x-1/3 before:bg-gradient-conic before:from-blue-200 before:via-sky-200 before:blur-2xl before:content-[''] after:dark:bg-gradient-to-br after:dark:from-transparent before:dark:to-blue-700/10 before:dark:from-sky-900 before:dark:via-[#0141ff]/40 after:lg:h-[360px]">
        <div className=" dark:drop-shadow-[0_0_0.3rem_#ffffff50] dark:invert"></div>
      </div>
    </main>
  );
}
