import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

// Editorial serif for oversized display headings.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Clean modern sans for body, labels and UI.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aurelis Residences — Elevated Living. Timeless Design.",
  description:
    "Aurelis Residences — luxury 3 & 4 BHK residences in Gurugram. A new expression of contemporary luxury. Starting ₹1.85 Cr.",
  keywords: [
    "Aurelis Residences",
    "luxury apartments Gurugram",
    "3 BHK Gurugram",
    "4 BHK Gurugram",
    "premium residences",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
