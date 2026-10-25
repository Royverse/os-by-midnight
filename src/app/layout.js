import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WindowManagerProvider } from "../context/WindowManager";
import { ThemeProvider } from "../context/ThemeContext";
import AppPreloader from "../components/AppPreloader";

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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppPreloader />
        <a href="#desktop-stage" className="skip-link">Skip to desktop</a>
        <ThemeProvider>
          <WindowManagerProvider>
            {children}
          </WindowManagerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
