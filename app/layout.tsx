import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { ReactNode } from "react"
import "./globals.css"

const ibmPlexSans = localFont({
  src: [
    { path: "/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "/fonts/IBMPlexSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
})

const bebasNeue = localFont({
  src: [
    { path: "/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
})

export const metadata: Metadata = {
  title: "EtudeJS",
  description:
    "EtudeJS is a website oriented music learning platform, where you can learn music theory, practice with exercises, and more.",
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSans.className} ${bebasNeue.variable}  antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}

export default RootLayout
