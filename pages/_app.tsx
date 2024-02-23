import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter';
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppCacheProvider {...pageProps}>
      <Navbar />
  <Component  />;
  <Analytics />
  <SpeedInsights />
  </AppCacheProvider>
  )
}
