import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter';
// import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/Navbar";
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppCacheProvider    className={cn(
      "min-h-screen bg-background font-sans antialiased",
      fontSans.variable
    )} {...pageProps}>
      <Navbar />
  <Component  />;
  <Analytics />
  <SpeedInsights />
  </AppCacheProvider>
  )
}
