import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
          <main className="max-w-6xl mx-auto flex-1 pt-16 ">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}