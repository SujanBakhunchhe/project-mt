import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BikeParts Nepal - Premium Motorcycle Parts",
  description: "Quality motorcycle parts and accessories delivered across Nepal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden flex flex-col">
          {/* Animated Background Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600 rounded-full opacity-30 filter blur-3xl animate-blob"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-600 rounded-full opacity-30 filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-violet-600 rounded-full opacity-30 filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10 flex-1 flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
