import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WindowManagerProvider } from "../context/WindowManager";
import { ThemeProvider } from "../context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Midnight OS Demo",
  description: "A genuinely useful daily web OS for everyone.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <WindowManagerProvider>
            {children}
          </WindowManagerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
