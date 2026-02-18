
'use client';
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Provider } from "@/components/provider";
import { Footer } from "@/components/footer";


const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          <Header />

          {/* Main content area with sidebar */}
          <div className="flex min-h-screen">
            {/* Sidebar (Navbar) */}
            <Navbar />

            {/* Main dashboard content */}
            <main className="flex-1 p-4 overflow-y-auto">
              {children}
            </main>
          </div>

          <Footer />
        </Provider>
      </body>
    </html>
  );
}
