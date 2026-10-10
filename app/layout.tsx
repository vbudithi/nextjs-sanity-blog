
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "VivByte",
  description: "Latest tech insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          <main className="w-full max-w-[1800px] mx-auto flex-1 pt-16 px-6 xl:px-10 2xl:px-12">
            {children}
            <Toaster position="top-center" />
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
