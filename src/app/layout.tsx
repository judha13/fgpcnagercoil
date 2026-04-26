import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./styles/globals.css";
import { Poppins, Montserrat } from 'next/font/google';
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ["400", "500", "600", "700"],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "FGP C Nagercoil",
  description: "FGP Church Nagercoil",
};

export default function MainpageLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${montserrat.variable}`}>
      <body>
        {children}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
