import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

import NavigationBar from "@/app/components/navigation_bar"

/*
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
*/

export const metadata: Metadata = {
  title: "Spacial Repition",
  description: "A flashcards system that shows more frequently missed cards more often.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className="font-sans font-semibold text-text bg-background antialiased"
      >
        <NavigationBar/>
        <div className="mt-10">
          {children}
        </div>
      </body>
    </html>
  )
}
