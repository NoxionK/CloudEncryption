import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { FilesProvider } from "@/components/provider/FileProvider";
import NextUIProvider from "@/components/provider/NextUIProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cloud Encrypt",
  description: "Encrypt your files in the cloud",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <FilesProvider>
        <body className="font-sans">
          <NextUIProvider>
            <div className="bg-sky-100 flex flex-row">
              <div className="min-h-screen">
                <Toaster position="top-right"></Toaster>
                <Navbar></Navbar>
              </div>
              {children}
            </div>
          </NextUIProvider>
        </body>
      </FilesProvider>

    </html>
  );
}
